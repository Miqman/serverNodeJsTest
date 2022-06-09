# serverNodeJsTest

# food API Documentation

List of available endpoints:

- `POST /users/register`
- `POST /users/login`
- `GET /foods`
- `GET /foods/:id`

Routes below need authentication:

- `POST /foods`
- `PUT /foods/:id`
- `PATCH /foods/:id`
- `DELETE /foods/:id`

&nbsp;

## 1. POST /users/register

### Description

- Register user

Request:

- body:

```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

_Response (201 - Created)_

```json
{
  "email": "string",
  "name": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "Email must be unique"
}
OR
{
  "message": "Password is required"
}
```

&nbsp;

## 2. POST /users/login

### Description

- Login user

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string",
  "name": "string",
  "email": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email/password"
}
```

## 3. GET /foods

Description:

- Fetch all food from database and include eager loading table category

_Response (200 - OK)_

```json
[
  {
    "id": 1,
    "name": "Burger",
    "description": "FastFood enak langsung makan",
    "imageUrl": "https://foto.kontan.co.id/s0VRkMh0kfKeu-aE5k836PeMRpg=/smart/2022/01/06/221687372p.jpg",
    "price": "25000",
    "UserId": 1,
    "CategoryId": 1,
    "Category": {
      "id": 1,
      "name": "Makanan"
    }
  },
  {
    "id": 2,
    "name": "Kebab",
    "description": "FastFood enak langsung makan",
    "imageUrl": "https://images.tokopedia.net/img/cache/500-square/product-1/2019/1/10/5196171/5196171_d9d999fd-ee02-497b-9c2b-582104580ddc_900_900.jpg",
    "price": "15000",
    "UserId": 1,
    "CategoryId": 1,
    "Category": {
      "id": 1,
      "name": "Makanan"
    }
  }
]
```

&nbsp;

## 4. GET /foods/:id

Description:

- Fetch one data food from database by params id

_Response (200 - OK)_

```json
{
  "Code": 200,
  "data": {
    "id": 2,
    "name": "Kebab",
    "description": "FastFood enak langsung makan",
    "imageUrl": "https://images.tokopedia.net/img/cache/500-square/product-1/2019/1/10/5196171/5196171_d9d999fd-ee02-497b-9c2b-582104580ddc_900_900.jpg",
    "price": "15000",
    "UserId": 1,
    "CategoryId": 1
  }
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data not found"
}
```

&nbsp;

## 5. POST /foods

Description:

- Add or create one food

Request:

- Headers
  ```json
  {
    "Content-Type": "application/x-www-form-urlencoded"
  },
  {
  "access_token": "string"
  }
  ```
- Body
  ```json
  {
    "name": string,
    "description": string,
    "price": integer,
    "imgUrl": string,
    "CategoryId": integer,
  }
  ```

_Response (201 - OK)_

```json
{
    "Code": 201,
    "message": "Food created successfully",
    "data": {
      "id": Integer,
      "name": string,
      "description": string,
      "price": integer,
      "imgUrl": string,
      "UserId": integer,
      "CategoryId": integer,
      "createdAt": date,
      "updatedAt": date,
    }
}
```

&nbsp;

## 6. PUT /foods/:id

Description:

- Edit one data food by params id

Request:

- Headers
  ```json
  {
    "Content-Type": "application/x-www-form-urlencoded"
  },
  {
  "access_token": "string"
  }
  ```
- Body
  ```json
  {
    "name": string,
    "description": string,
    "price": integer,
    "imgUrl": string,
    "CategoryId": integer,
  }
  ```

_Response (200 - OK)_

```json
{
    "Code": 200,
    "data": {
      "id": Integer,
      "name": string,
      "description": string,
      "price": integer,
      "imgUrl": string,
      "UserId": integer,
      "CategoryId": integer,
      "createdAt": date,
      "updatedAt": date,
    }
}
```

_404 - Not Found_

- Body

  ```json
  {
    "statusCode": 404,
    "error": {
      "message": String
    }
  }
  ```

&nbsp;

## 7. PUT /foods/:id

Description:

- Edit Specific data that is 'price'/'name' food by params id

Request:

- Headers
  ```json
  {
    "Content-Type": "application/x-www-form-urlencoded"
  },
  {
  "access_token": "string"
  }
  ```
- Body
  ```json
  {
    "name": string,
    "price": integer,
  }
  ```

_Response (200 - OK)_

```json
{
    "Code": 200,
    "data": {
      "id": Integer,
      "name": string,
      "description": string,
      "price": integer,
      "imgUrl": string,
      "UserId": integer,
      "CategoryId": integer,
      "createdAt": date,
      "updatedAt": date,
    }
}
```

_404 - Not Found_

- Body

  ```json
  {
    "statusCode": 404,
    "error": {
      "message": String
    }
  }
  ```

&nbsp;

## 8. DELETE /foods/:id

#### Description

- Remove a data Food based on given id

Request:

- Headers
  ```json
  {
    "Content-Type": "application/x-www-form-urlencoded"
  },
  {
  "access_token": "string"
  }
  ```

#### Response

_200 - OK_

```json
{
  "Code": 200,
  "message": "Food with id '4' success to delete"
}
```

_404 - Not Found_

- Body
  ```json
  {
    "Code": 404,
    "error": {
      "message": "Data not found"
    }
  }
  ```

### Global Error

#### Response

_500 - Internal Server Error_

- Body
  ```json
  {
    "statusCode": 500,
    "error": {
      "message": "Internal Server Error"
    }
  }
  ```
