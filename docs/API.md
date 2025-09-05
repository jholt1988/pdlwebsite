# API Documentation

This document provides comprehensive documentation for the PDL Rentals website backend API, built with Supabase Edge Functions and PostgreSQL.

## 🌐 API Overview

### Base URL
```
Production: https://your-project-ref.supabase.co/functions/v1
Development: http://localhost:54321/functions/v1
```

### Authentication
- **Type**: API Key based authentication
- **Header**: `Authorization: Bearer YOUR_API_KEY`
- **API Key**: Available in Supabase project settings

### Content Types
- **Request**: `application/json` or `multipart/form-data`
- **Response**: `application/json`

## 🔐 Security Features

### Rate Limiting
- **Limit**: 10 requests per minute per IP
- **Reset**: Rolling window
- **Headers**: 
  - `X-RateLimit-Limit`: Request limit
  - `X-RateLimit-Remaining`: Remaining requests
  - `X-RateLimit-Reset`: Reset timestamp

### CORS Configuration
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Headers: authorization, x-client-info, apikey, content-type
Access-Control-Allow-Methods: POST, OPTIONS
```

### Data Protection
- **Input Validation**: All fields validated server-side
- **SQL Injection Protection**: Parameterized queries
- **File Upload Security**: Type and size validation
- **PII Encryption**: Sensitive data encrypted at rest

## 📝 Applications API

### Submit Rental Application

**Endpoint**: `POST /applications`

**Description**: Submits a new rental application with optional document uploads.

#### Request Body

```json
{
  "firstName": "John",
  "lastName": "Doe", 
  "email": "john.doe@example.com",
  "phone": "+1-555-123-4567",
  "dateOfBirth": "1990-01-15",
  "ssn": "123-45-6789",
  "propertyType": "apartment",
  "bedrooms": "2",
  "maxRent": 1500,
  "moveInDate": "2024-03-01",
  "leaseTerm": "12 months",
  "pets": "1 cat",
  "employer": "Tech Company Inc",
  "position": "Software Developer",
  "monthlyIncome": 5000,
  "employmentLength": "2 years",
  "additionalIncome": 500,
  "previousLandlord": "Jane Smith",
  "landlordPhone": "+1-555-987-6543",
  "reference1Name": "Alice Johnson",
  "reference1Phone": "+1-555-111-2222",
  "reference2Name": "Bob Wilson",
  "reference2Phone": "+1-555-333-4444",
  "documents": {
    "idDocument": "base64_encoded_file_data",
    "incomeProof": "base64_encoded_file_data",
    "additionalDocs": "base64_encoded_file_data"
  }
}
```

#### Field Validation

| Field | Type | Required | Validation Rules |
|-------|------|----------|------------------|
| `firstName` | string | ✅ | 1-50 characters, letters only |
| `lastName` | string | ✅ | 1-50 characters, letters only |
| `email` | string | ✅ | Valid email format |
| `phone` | string | ✅ | Valid phone number, 10+ digits |
| `dateOfBirth` | string | ✅ | ISO date format, 18+ years old |
| `ssn` | string | ✅ | Format: XXX-XX-XXXX |
| `propertyType` | string | ✅ | apartment, house, condo, townhouse |
| `bedrooms` | string | ✅ | studio, 1, 2, 3, 4, 5+ |
| `maxRent` | number | ✅ | Positive number, max $10,000 |
| `moveInDate` | string | ✅ | ISO date, future date |
| `leaseTerm` | string | ✅ | 6 months, 12 months, 18 months, 24 months |
| `pets` | string | ❌ | Optional description |
| `employer` | string | ✅ | 1-100 characters |
| `position` | string | ✅ | 1-100 characters |
| `monthlyIncome` | number | ✅ | Positive number |
| `employmentLength` | string | ✅ | Time period description |
| `additionalIncome` | number | ❌ | Optional positive number |
| `previousLandlord` | string | ❌ | Optional, 1-100 characters |
| `landlordPhone` | string | ❌ | Optional valid phone |
| `reference1Name` | string | ✅ | 1-100 characters |
| `reference1Phone` | string | ✅ | Valid phone number |
| `reference2Name` | string | ❌ | Optional, 1-100 characters |
| `reference2Phone` | string | ❌ | Optional valid phone |

#### Document Upload

**Supported Formats**: PDF, JPG, PNG, DOCX
**Maximum Size**: 5MB per file
**Encoding**: Base64 in JSON or multipart/form-data

```json
{
  "documents": {
    "idDocument": "data:application/pdf;base64,JVBERi0xLjQK...",
    "incomeProof": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ...",
    "additionalDocs": "data:application/pdf;base64,JVBERi0xLjQK..."
  }
}
```

#### Success Response (201 Created)

```json
{
  "success": true,
  "data": {
    "applicationId": "550e8400-e29b-41d4-a716-446655440000",
    "submissionTimestamp": "2024-01-15T10:30:00Z",
    "status": "submitted",
    "applicantName": "John Doe",
    "propertyInterest": "2 bedroom apartment"
  },
  "message": "Application submitted successfully"
}
```

#### Error Responses

**400 Bad Request**
```json
{
  "success": false,
  "error": {
    "code": "BAD_REQUEST",
    "message": "Invalid request format",
    "details": "Request body must be valid JSON"
  }
}
```

**422 Validation Error**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR", 
    "message": "Validation failed",
    "details": {
      "email": "Invalid email format",
      "phone": "Phone number must be at least 10 digits",
      "dateOfBirth": "Must be 18 years or older"
    }
  }
}
```

**413 Payload Too Large**
```json
{
  "success": false,
  "error": {
    "code": "FILE_TOO_LARGE",
    "message": "File size exceeds maximum limit",
    "details": "Maximum file size is 5MB"
  }
}
```

**415 Unsupported Media Type**
```json
{
  "success": false,
  "error": {
    "code": "UNSUPPORTED_FILE_TYPE",
    "message": "File type not supported",
    "details": "Supported formats: PDF, JPG, PNG, DOCX"
  }
}
```

**429 Too Many Requests**
```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many requests",
    "details": "Maximum 10 requests per minute"
  }
}
```

**500 Internal Server Error**
```json
{
  "success": false,
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "Internal server error",
    "details": "An unexpected error occurred"
  }
}
```

## 🗄️ Database Schema

### Applications Table

```sql
CREATE TABLE applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Personal Information
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  date_of_birth DATE NOT NULL,
  ssn VARCHAR(11) NOT NULL, -- Encrypted
  
  -- Property Preferences
  property_type VARCHAR(20) NOT NULL,
  bedrooms VARCHAR(10) NOT NULL,
  max_rent DECIMAL(10,2) NOT NULL,
  move_in_date DATE NOT NULL,
  lease_term VARCHAR(20) NOT NULL,
  pets TEXT,
  
  -- Employment Information
  employer VARCHAR(100) NOT NULL,
  position VARCHAR(100) NOT NULL,
  monthly_income DECIMAL(10,2) NOT NULL,
  employment_length VARCHAR(50) NOT NULL,
  additional_income DECIMAL(10,2),
  
  -- References
  previous_landlord VARCHAR(100),
  landlord_phone VARCHAR(20),
  reference1_name VARCHAR(100) NOT NULL,
  reference1_phone VARCHAR(20) NOT NULL,
  reference2_name VARCHAR(100),
  reference2_phone VARCHAR(20),
  
  -- Status and Processing
  status VARCHAR(20) DEFAULT 'submitted',
  processed_at TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  
  -- Metadata
  ip_address INET,
  user_agent TEXT,
  submission_source VARCHAR(50) DEFAULT 'website'
);
```

### Document Storage

```sql
CREATE TABLE application_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID REFERENCES applications(id) ON DELETE CASCADE,
  document_type VARCHAR(50) NOT NULL, -- 'id', 'income_proof', 'additional'
  file_name VARCHAR(255) NOT NULL,
  file_path VARCHAR(500) NOT NULL,
  file_size INTEGER NOT NULL,
  mime_type VARCHAR(100) NOT NULL,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Row Level Security (RLS)

```sql
-- Enable RLS
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE application_documents ENABLE ROW LEVEL SECURITY;

-- Policy for application access
CREATE POLICY "Applications are viewable by admin only" 
ON applications FOR SELECT 
USING (auth.role() = 'admin');

-- Policy for document access
CREATE POLICY "Documents are viewable by admin only"
ON application_documents FOR SELECT
USING (auth.role() = 'admin');
```

## 🔧 Integration Examples

### JavaScript/TypeScript Client

```typescript
interface ApplicationSubmission {
  firstName: string;
  lastName: string;
  email: string;
  // ... other fields
}

class ApplicationService {
  private baseUrl = 'https://your-project.supabase.co/functions/v1';
  
  async submitApplication(data: ApplicationSubmission): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/applications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify(data)
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error?.message || 'Submission failed');
      }
      
      return result;
    } catch (error) {
      console.error('Application submission error:', error);
      throw error;
    }
  }
}
```

### React Hook Implementation

```typescript
import { useState } from 'react';

export const useApplicationSubmission = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const submitApplication = async (data: ApplicationSubmission) => {
    setLoading(true);
    setError(null);
    
    try {
      const service = new ApplicationService();
      const result = await service.submitApplication(data);
      
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  return { submitApplication, loading, error };
};
```

### Form Integration

```typescript
const ApplicationForm: React.FC = () => {
  const { submitApplication, loading, error } = useApplicationSubmission();
  
  const handleSubmit = async (formData: ApplicationSubmission) => {
    try {
      const result = await submitApplication(formData);
      console.log('Application submitted:', result.data.applicationId);
      // Handle success (redirect, show message, etc.)
    } catch (error) {
      console.error('Submission failed:', error);
      // Handle error (show error message, etc.)
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button type="submit" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit Application'}
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};
```

## 📊 Monitoring and Analytics

### Logging

All API requests are logged with:
- Request timestamp
- Client IP address
- User agent
- Request/response data (excluding sensitive fields)
- Processing time
- Error details (if any)

### Metrics Tracked

- **Application Volume**: Submissions per day/week/month
- **Success Rate**: Percentage of successful submissions
- **Error Rate**: Frequency and types of errors
- **Response Time**: API performance metrics
- **File Upload Stats**: Upload success rates and sizes

### Health Check

**Endpoint**: `GET /health`

**Response**:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00Z",
  "version": "1.0.0",
  "database": "connected",
  "storage": "accessible"
}
```

## 🚀 Future API Enhancements

### Planned Endpoints

- `GET /applications/{id}` - Retrieve application details
- `PUT /applications/{id}` - Update application status
- `GET /applications` - List applications with filtering
- `DELETE /applications/{id}` - Remove application (admin only)
- `POST /applications/{id}/documents` - Upload additional documents

### Feature Roadmap

- **Real-time Updates**: WebSocket notifications for status changes
- **Bulk Operations**: Import/export applications
- **Advanced Search**: Full-text search capabilities
- **Integration APIs**: Third-party service connections
- **Mobile API**: Optimized endpoints for mobile apps

---

*This API documentation is maintained by the PDL Rentals development team and updated with each API change.*