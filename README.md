# API Documentation

## History

### Get History

Retrieve the history data.

- **URL:** `/api/history`
- **Method:** `GET`

#### Query Parameters

| Parameter | Type   | Description                  |
|-----------|--------|------------------------------|
| limit     | number | Maximum number of records    |
| offset    | number | Number of records to skip    |

#### Response

- **Status Code:** 200 OK
- **Content:**

```json
[
  {
    "course": 27717.77544973733,
    "time": "2023-05-30T23:23:00.000Z"
  },
  {
    "course": 28521.224127262648,
    "time": "2023-05-30T23:24:00.000Z"
  },
]
```

## Interval

### Get Interval

Retrieve the current interval value.

- **URL:** `/api/interval`
- **Method:** `GET`

#### Response

- **Status Code:** 200 OK
- **Content:**

```json
{
  "interval": 5000
}
```

### Update Interval

Update the interval value.

- **URL:** `/api/interval`
- **Method:** `PUT`

#### Request Headers

| Header   | Type   | Description                  |
|----------|--------|------------------------------|
| interval | number | New interval value           |

#### Response

- **Status Code:** 200 OK
- **Content:**

```json
{
  "message": "Updated interval to 10000"
}
```
