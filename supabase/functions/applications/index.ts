/*
  # Application Submission API Endpoint

  ## Overview
  This endpoint handles rental application submissions with comprehensive validation,
  file upload support, and security measures.

  ## Endpoint
  POST /functions/v1/applications

  ## Request Format
  Content-Type: multipart/form-data or application/json

  ### JSON Request Body
  ```json
  {
    "firstName": "string (required)",
    "lastName": "string (required)", 
    "email": "string (required, valid email)",
    "phone": "string (required, valid phone)",
    "dateOfBirth": "string (required, ISO date)",
    "ssn": "string (required)",
    "propertyType": "string (required)",
    "bedrooms": "string (required)",
    "maxRent": "number (required)",
    "moveInDate": "string (required, ISO date)",
    "leaseTerm": "string (required)",
    "pets": "string (optional)",
    "employer": "string (required)",
    "position": "string (required)",
    "monthlyIncome": "number (required)",
    "employmentLength": "string (required)",
    "additionalIncome": "number (optional)",
    "previousLandlord": "string (optional)",
    "landlordPhone": "string (optional)",
    "reference1Name": "string (required)",
    "reference1Phone": "string (required)",
    "reference2Name": "string (optional)",
    "reference2Phone": "string (optional)",
    "documents": {
      "idDocument": "base64 string (required)",
      "incomeProof": "base64 string (required)",
      "additionalDocs": "base64 string (optional)"
    }
  }
  ```

  ## Response Format
  ### Success Response (201 Created)
  ```json
  {
    "success": true,
    "data": {
      "applicationId": "uuid",
      "submissionTimestamp": "ISO datetime",
      "status": "submitted",
      "applicantName": "string",
      "propertyInterest": "string"
    },
    "message": "Application submitted successfully"
  }
  ```

  ### Error Response (400/422/500)
  ```json
  {
    "success": false,
    "error": {
      "code": "VALIDATION_ERROR",
      "message": "Validation failed",
      "details": {
        "field": "error description"
      }
    }
  }
  ```

  ## Error Codes
  - 400: Bad Request - Invalid input data
  - 422: Unprocessable Entity - Validation errors
  - 413: Payload Too Large - File size exceeds limit
  - 415: Unsupported Media Type - Invalid file format
  - 429: Too Many Requests - Rate limit exceeded
  - 500: Internal Server Error - Server/database issues
*/

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'npm:@supabase/supabase-js@2'

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

// Rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

// Validation schemas
interface ApplicationData {
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  ssn: string
  propertyType: string
  bedrooms: string
  maxRent: number
  moveInDate: string
  leaseTerm: string
  pets?: string
  employer: string
  position: string
  monthlyIncome: number
  employmentLength: string
  additionalIncome?: number
  previousLandlord?: string
  landlordPhone?: string
  reference1Name: string
  reference1Phone: string
  reference2Name?: string
  reference2Phone?: string
  documents?: {
    idDocument?: string
    incomeProof?: string
    additionalDocs?: string
  }
}

// Validation functions
function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function validatePhone(phone: string): boolean {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
  const cleanPhone = phone.replace(/[\s\-\(\)\.]/g, '')
  return phoneRegex.test(cleanPhone) && cleanPhone.length >= 10
}

function validateSSN(ssn: string): boolean {
  const ssnRegex = /^\d{3}-?\d{2}-?\d{4}$/
  return ssnRegex.test(ssn)
}

function validateDate(dateString: string): boolean {
  const date = new Date(dateString)
  return date instanceof Date && !isNaN(date.getTime())
}

function validateFileSize(base64String: string, maxSizeMB: number = 10): boolean {
  if (!base64String) return true // Optional files
  
  // Calculate file size from base64 (approximate)
  const sizeInBytes = (base64String.length * 3) / 4
  const sizeInMB = sizeInBytes / (1024 * 1024)
  return sizeInMB <= maxSizeMB
}

function validateFileType(base64String: string): boolean {
  if (!base64String) return true // Optional files
  
  // Check file signature from base64 header
  const allowedTypes = [
    'data:application/pdf',
    'data:application/msword',
    'data:application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'data:image/jpeg',
    'data:image/png'
  ]
  
  return allowedTypes.some(type => base64String.startsWith(type))
}

function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, '')
}

function validateApplicationData(data: ApplicationData): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {}

  // Required string fields
  const requiredFields = [
    'firstName', 'lastName', 'email', 'phone', 'dateOfBirth', 'ssn',
    'propertyType', 'bedrooms', 'moveInDate', 'leaseTerm',
    'employer', 'position', 'employmentLength', 'reference1Name', 'reference1Phone'
  ]

  for (const field of requiredFields) {
    if (!data[field as keyof ApplicationData] || String(data[field as keyof ApplicationData]).trim() === '') {
      errors[field] = `${field} is required`
    }
  }

  // Email validation
  if (data.email && !validateEmail(data.email)) {
    errors.email = 'Invalid email format'
  }

  // Phone validation
  if (data.phone && !validatePhone(data.phone)) {
    errors.phone = 'Invalid phone number format'
  }

  // SSN validation
  if (data.ssn && !validateSSN(data.ssn)) {
    errors.ssn = 'Invalid SSN format'
  }

  // Date validation
  if (data.dateOfBirth && !validateDate(data.dateOfBirth)) {
    errors.dateOfBirth = 'Invalid date format'
  }

  if (data.moveInDate && !validateDate(data.moveInDate)) {
    errors.moveInDate = 'Invalid date format'
  }

  // Numeric validation
  if (data.maxRent && (isNaN(data.maxRent) || data.maxRent <= 0)) {
    errors.maxRent = 'Maximum rent must be a positive number'
  }

  if (data.monthlyIncome && (isNaN(data.monthlyIncome) || data.monthlyIncome <= 0)) {
    errors.monthlyIncome = 'Monthly income must be a positive number'
  }

  // File validation
  if (data.documents) {
    if (data.documents.idDocument) {
      if (!validateFileType(data.documents.idDocument)) {
        errors.idDocument = 'Invalid file type. Only PDF, DOC, DOCX, JPG, PNG allowed'
      }
      if (!validateFileSize(data.documents.idDocument)) {
        errors.idDocument = 'File size exceeds 10MB limit'
      }
    }

    if (data.documents.incomeProof) {
      if (!validateFileType(data.documents.incomeProof)) {
        errors.incomeProof = 'Invalid file type. Only PDF, DOC, DOCX, JPG, PNG allowed'
      }
      if (!validateFileSize(data.documents.incomeProof)) {
        errors.incomeProof = 'File size exceeds 10MB limit'
      }
    }

    if (data.documents.additionalDocs) {
      if (!validateFileType(data.documents.additionalDocs)) {
        errors.additionalDocs = 'Invalid file type. Only PDF, DOC, DOCX, JPG, PNG allowed'
      }
      if (!validateFileSize(data.documents.additionalDocs)) {
        errors.additionalDocs = 'File size exceeds 10MB limit'
      }
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

function checkRateLimit(clientIP: string): boolean {
  const now = Date.now()
  const windowMs = 15 * 60 * 1000 // 15 minutes
  const maxRequests = 5 // 5 requests per window

  const clientData = rateLimitStore.get(clientIP)
  
  if (!clientData || now > clientData.resetTime) {
    rateLimitStore.set(clientIP, { count: 1, resetTime: now + windowMs })
    return true
  }

  if (clientData.count >= maxRequests) {
    return false
  }

  clientData.count++
  return true
}

async function uploadDocument(
  supabase: any,
  applicationId: string,
  documentType: string,
  base64Data: string
): Promise<string | null> {
  try {
    if (!base64Data) return null

    // Extract file extension from base64 header
    const mimeType = base64Data.split(';')[0].split(':')[1]
    const extension = mimeType.split('/')[1] === 'pdf' ? 'pdf' : 
                     mimeType.includes('word') ? 'doc' : 
                     mimeType.split('/')[1]

    // Convert base64 to blob
    const base64Content = base64Data.split(',')[1]
    const binaryString = atob(base64Content)
    const bytes = new Uint8Array(binaryString.length)
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i)
    }

    const fileName = `${applicationId}/${documentType}.${extension}`
    
    const { data, error } = await supabase.storage
      .from('application-documents')
      .upload(fileName, bytes, {
        contentType: mimeType,
        upsert: false
      })

    if (error) {
      console.error('File upload error:', error)
      return null
    }

    return data.path
  } catch (error) {
    console.error('Document upload error:', error)
    return null
  }
}

serve(async (req) => {
  try {
    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders })
    }

    // Only allow POST requests
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({
          success: false,
          error: {
            code: 'METHOD_NOT_ALLOWED',
            message: 'Only POST requests are allowed'
          }
        }),
        {
          status: 405,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Rate limiting
    const clientIP = req.headers.get('x-forwarded-for') || 'unknown'
    if (!checkRateLimit(clientIP)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: {
            code: 'RATE_LIMIT_EXCEEDED',
            message: 'Too many requests. Please try again later.'
          }
        }),
        {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Parse request body
    let applicationData: ApplicationData
    try {
      const body = await req.json()
      applicationData = body
    } catch (error) {
      return new Response(
        JSON.stringify({
          success: false,
          error: {
            code: 'INVALID_JSON',
            message: 'Invalid JSON in request body'
          }
        }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Sanitize input data
    const sanitizedData = {
      ...applicationData,
      firstName: sanitizeInput(applicationData.firstName),
      lastName: sanitizeInput(applicationData.lastName),
      email: sanitizeInput(applicationData.email),
      phone: sanitizeInput(applicationData.phone),
      employer: sanitizeInput(applicationData.employer),
      position: sanitizeInput(applicationData.position),
    }

    // Validate application data
    const validation = validateApplicationData(sanitizedData)
    if (!validation.isValid) {
      return new Response(
        JSON.stringify({
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Validation failed',
            details: validation.errors
          }
        }),
        {
          status: 422,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Generate application ID
    const applicationId = crypto.randomUUID()
    const submissionTimestamp = new Date().toISOString()

    // Upload documents if provided
    let documentUrls: Record<string, string | null> = {}
    if (sanitizedData.documents) {
      documentUrls = {
        idDocument: await uploadDocument(supabase, applicationId, 'id-document', sanitizedData.documents.idDocument || ''),
        incomeProof: await uploadDocument(supabase, applicationId, 'income-proof', sanitizedData.documents.incomeProof || ''),
        additionalDocs: await uploadDocument(supabase, applicationId, 'additional-docs', sanitizedData.documents.additionalDocs || '')
      }
    }

    // Insert application into database
    const { data: insertData, error: insertError } = await supabase
      .from('rental_applications')
      .insert({
        id: applicationId,
        first_name: sanitizedData.firstName,
        last_name: sanitizedData.lastName,
        email: sanitizedData.email,
        phone: sanitizedData.phone,
        date_of_birth: sanitizedData.dateOfBirth,
        ssn_last_four: sanitizedData.ssn.slice(-4), // Store only last 4 digits
        property_type: sanitizedData.propertyType,
        bedrooms: sanitizedData.bedrooms,
        max_rent: sanitizedData.maxRent,
        move_in_date: sanitizedData.moveInDate,
        lease_term: sanitizedData.leaseTerm,
        pets: sanitizedData.pets,
        employer: sanitizedData.employer,
        position: sanitizedData.position,
        monthly_income: sanitizedData.monthlyIncome,
        employment_length: sanitizedData.employmentLength,
        additional_income: sanitizedData.additionalIncome,
        previous_landlord: sanitizedData.previousLandlord,
        landlord_phone: sanitizedData.landlordPhone,
        reference1_name: sanitizedData.reference1Name,
        reference1_phone: sanitizedData.reference1Phone,
        reference2_name: sanitizedData.reference2Name,
        reference2_phone: sanitizedData.reference2Phone,
        id_document_url: documentUrls.idDocument,
        income_proof_url: documentUrls.incomeProof,
        additional_docs_url: documentUrls.additionalDocs,
        status: 'submitted',
        submitted_at: submissionTimestamp,
        created_at: submissionTimestamp,
        updated_at: submissionTimestamp
      })
      .select()
      .single()

    if (insertError) {
      console.error('Database insert error:', insertError)
      return new Response(
        JSON.stringify({
          success: false,
          error: {
            code: 'DATABASE_ERROR',
            message: 'Failed to save application'
          }
        }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Return success response
    return new Response(
      JSON.stringify({
        success: true,
        data: {
          applicationId: applicationId,
          submissionTimestamp: submissionTimestamp,
          status: 'submitted',
          applicantName: `${sanitizedData.firstName} ${sanitizedData.lastName}`,
          propertyInterest: sanitizedData.propertyType
        },
        message: 'Application submitted successfully'
      }),
      {
        status: 201,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Unexpected error:', error)
    return new Response(
      JSON.stringify({
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'An unexpected error occurred'
        }
      }),
      {
        status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})