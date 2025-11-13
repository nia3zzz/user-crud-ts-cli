# User CRUD TS CLI

### Project Idea Summary

This project is a learning project I built to explore how a CLI works under the hood. It includes very simple CRUD operations on a user model. For more information, refer to the code base.

---

### Tech Stack Summary

This project uses:

- **MongoDB** as its database
- **AJV** for data validation
- **CommanderJS** for initializing commands and writing logic for those commands

---

### How to Use

#### 1. Clone the Repository

```bash
git clone https://github.com/nia3zzz/graphql-voting-app
cd graphql-voting-app
```

#### 2. Install Dependencies

```bash
npm install
```

#### 3. Set Up ENV Variables

- Copy the variable from `.env.sample` into a new `.env` file and supply your MongoDB URI.

#### 4. Run the Project

```bash
npm run start <command>
```

---

## Documentation

All the commands are listed here with examples of usage and expected results.

---

### 1. Create User Command

The `create-user` command takes 3 required arguments:

```bash
npm run start create-user "John Doe" "john@example.com" "+8801234567890"
```

**Notes:**

- Fails if a user already exists with the same email or phone number.
- Returns the `_id` of the newly created user.

---

### 2. Get Users Command

The `get-user` command fetches multiple users with optional pagination:

```bash
npm run start get-user --limit 10 --skip 0
```

**Options:**

- `--limit` – Number of users to retrieve (default 10)
- `--skip` – Number of users to skip (default 0)

**Notes:**

- Returns an array of user objects.

---

### 3. Get User by ID Command

The `get-userById` command fetches a user by their `_id`:

```bash
npm run start get-userById "652c8f9e3a2c4d7f2b3c1234"
```

**Notes:**

- Returns the user object if found.
- Fails if no user exists with the provided `_id`.

---

### 4. Update User Command

The `update-user` command updates a user’s data:

```bash
npm run start update-user "652c8f9e3a2c4d7f2b3c1234" "John Smith" "johnsmith@example.com" "+8809876543210"
```

**Notes:**

- Requires all fields to be provided.
- Fails if the user does not exist.
- Returns a success message with the `_id` of the updated user.

---

### 5. Delete User Command

The `delete-user` command deletes a user by `_id`:

```bash
npm run start delete-user "652c8f9e3a2c4d7f2b3c1234"
```

**Notes:**

- Fails if the user does not exist.
- Returns a success message with the `_id` of the deleted user.

---
