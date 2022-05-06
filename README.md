# Scoring Component
A React component for grading structured tests.

![image](https://user-images.githubusercontent.com/84267269/167098797-a28ab910-546d-4056-b115-9f588f0b44ef.png)

# Input (criteria)
The component expects a "criteria" input in JSON format with the aspects and details for the grading.
A sample for the input:
```
{
  "name": "Final exam",
  "tasks": [
    {
      "name": "1. task",
      "aspects": [
        {
          "id": 11,
          "name": "1. aspect",
          "type": "list",
          "values": {
            "good": 5,
            "bad": 0
          },
          "required": true
        }
      ]
    },
    {
      "name": "2. task",
      "aspects": [
        {
          "id": 21,
          "name": "1. aspect",
          "description": "1. szempont description",
          "type": "number",
          "maxValue": 5,
          "required": true
        },
        {
          "id": 22,
          "name": "2. aspect",
          "description": "2. aspect description",
          "type": "number",
          "maxValue": 4,
          "required": true
        },
        {
          "id": 23,
          "name": "3. aspect",
          "description": "3. aspect description",
          "type": "number",
          "maxValue": 6,
          "required": true
        },
        {
          "id": 24,
          "name": "4. aspect",
          "description": "4. aspect description",
          "type": "number",
          "maxValue": 4,
          "required": false
        }
      ]
    },
    {
      "name": "3. task",
      "aspects": [
        {
          "id": 31,
          "name": "1. aspect",
          "type": "boolean",
          "value": 2
        }
      ]
    }
  ]
}
```
# Output (onSubmit, onCancel)
Save button: creates onSubmit event with a JSON output containing all the aspects of the criteria.
Cancel button: creates onCancel event with a JSON output containing the filled aspects of the criteria.
A sample for the output:
```
{
  "results": [
    {
      "id": 11,
      "value": 5
    },
    {
      "id": 21,
      "value": 4
    },
    {
      "id": 22,
      "value": 4
    },
    {
      "id": 23,
      "value": 2
    },
    {
      "id": 24,
      "value": 0
    },
    {
      "id": 31,
      "value": 0
    }
  ]
}
```
