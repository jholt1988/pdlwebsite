/**
 * Application API Client
 * 
 * Handles communication with the application submission endpoint
 */

export interface ApplicationFormData {
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
    idDocument?: File | null
    incomeProof?: File | null
    additionalDocs?: File | null
  }
}

export interface ApplicationResponse {
  success: boolean
  data?: {
    applicationId: string
    submissionTimestamp: string
    status: string
    applicantName: string
    propertyInterest: string
  }
  error?: {
    code: string
    message: string
    details?: Record<string, string>
  }
  message?: string
}

/**
 * Convert File to base64 string
 */
async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = error => reject(error)
  })
}

/**
 * Submit rental application
 */
export async function submitApplication(formData: ApplicationFormData): Promise<ApplicationResponse> {
  try {
    // Convert files to base64 if present
    const documents: Record<string, string> = {}
    
    if (formData.documents?.idDocument) {
      documents.idDocument = await fileToBase64(formData.documents.idDocument)
    }
    
    if (formData.documents?.incomeProof) {
      documents.incomeProof = await fileToBase64(formData.documents.incomeProof)
    }
    
    if (formData.documents?.additionalDocs) {
      documents.additionalDocs = await fileToBase64(formData.documents.additionalDocs)
    }

    // Prepare request payload
    const payload = {
      ...formData,
      documents: Object.keys(documents).length > 0 ? documents : undefined
    }

    // Remove File objects from payload
    delete payload.documents

    // Add base64 documents back
    if (Object.keys(documents).length > 0) {
      payload.documents = documents
    }

    // Submit to API endpoint
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/applications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify(payload)
    })

    const result: ApplicationResponse = await response.json()

    if (!response.ok) {
      throw new Error(result.error?.message || 'Application submission failed')
    }

    return result

  } catch (error) {
    console.error('Application submission error:', error)
    return {
      success: false,
      error: {
        code: 'SUBMISSION_ERROR',
        message: error instanceof Error ? error.message : 'An unexpected error occurred'
      }
    }
  }
}

/**
 * Validate file before upload
 */
export function validateFile(file: File): { isValid: boolean; error?: string } {
  const maxSize = 10 * 1024 * 1024 // 10MB
  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/jpeg',
    'image/png'
  ]

  if (file.size > maxSize) {
    return {
      isValid: false,
      error: 'File size must be less than 10MB'
    }
  }

  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: 'File type not supported. Please upload PDF, DOC, DOCX, JPG, or PNG files only.'
    }
  }

  return { isValid: true }
}

/**
 * Format file size for display
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}