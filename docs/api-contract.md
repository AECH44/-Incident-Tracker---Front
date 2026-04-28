# 🚨 Incident Tracker – API Contract

## Base URL
http://localhost:8080

---

## 📦 Modelo de datos

### Incident

```json
{
  "id": "string (uuid)",
  "title": "string",
  "description": "string",
  "severity": "P1 | P2 | P3",
  "status": "OPEN | ACKNOWLEDGED | RESOLVED",
  "assignedTo": "string | null",
  "createdAt": "ISO 8601",
  "updatedAt": "ISO 8601"
}

## Request Body:

{
  "title": "string (required)",
  "description": "string (optional)",
  "severity": "P1 | P2 | P3 (required)",
  "assignedTo": "string (optional)"
}