export const ADMIN_ROLE = "SUPER ADMIN";
export const USER_ROLE = "NORMAL USER";

export const INIT_PERMISSIONS = [
  /* ===================== MODULE: AUTH (5 quyền) ===================== */
  {
    "name": "Register",
    "apiPath": "/api/v1/auth/register",
    "method": "POST",
    "module": "AUTH",
    "createBy": { "_id": "691495144b0016ecd62a647e", "email": "test2@gmail.com" },
    "deleted": false, "createdAt": "2025-12-18T15:36:07.198Z", "updatedAt": "2025-12-18T15:36:07.198Z", "__v": 0
  },
  {
    "name": "Login",
    "apiPath": "/api/v1/auth/login",
    "method": "POST",
    "module": "AUTH",
    "createBy": { "_id": "691495144b0016ecd62a647e", "email": "test2@gmail.com" },
    "deleted": false, "createdAt": "2025-12-18T15:36:07.198Z", "updatedAt": "2025-12-18T15:36:07.198Z", "__v": 0
  },
  {
    "name": "Logout",
    "apiPath": "/api/v1/auth/logout",
    "method": "POST",
    "module": "AUTH",
    "createBy": { "_id": "691495144b0016ecd62a647e", "email": "test2@gmail.com" },
    "deleted": false, "createdAt": "2025-12-18T15:36:07.198Z", "updatedAt": "2025-12-18T15:36:07.198Z", "__v": 0
  },
  {
    "name": "Get user information",
    "apiPath": "/api/v1/auth/account",
    "method": "GET",
    "module": "AUTH",
    "createBy": { "_id": "691495144b0016ecd62a647e", "email": "test2@gmail.com" },
    "deleted": false, "createdAt": "2025-12-18T15:36:07.198Z", "updatedAt": "2025-12-18T15:36:07.198Z", "__v": 0
  },
  {
    "name": "Get user by refresh token",
    "apiPath": "/api/v1/auth/refresh",
    "method": "GET",
    "module": "AUTH",
    "createBy": { "_id": "691495144b0016ecd62a647e", "email": "test2@gmail.com" },
    "deleted": false, "createdAt": "2025-12-18T15:36:07.198Z", "updatedAt": "2025-12-18T15:36:07.198Z", "__v": 0
  },

  /* ===================== MODULE: USERS (5 quyền) ===================== */
  {
    "name": "Create a new User",
    "apiPath": "/api/v1/users",
    "method": "POST",
    "module": "USERS",
    "createBy": { "_id": "691495144b0016ecd62a647e", "email": "test2@gmail.com" },
    "deleted": false, "createdAt": "2025-12-18T15:36:07.198Z", "updatedAt": "2025-12-18T15:36:07.198Z", "__v": 0
  },
  {
    "name": "Get User with paginate",
    "apiPath": "/api/v1/users",
    "method": "GET",
    "module": "USERS",
    "createBy": { "_id": "691495144b0016ecd62a647e", "email": "test2@gmail.com" },
    "deleted": false, "createdAt": "2025-12-18T15:36:07.198Z", "updatedAt": "2025-12-18T15:36:07.198Z", "__v": 0
  },
  {
    "name": "Get User by id",
    "apiPath": "/api/v1/users/:id",
    "method": "GET",
    "module": "USERS",
    "createBy": { "_id": "691495144b0016ecd62a647e", "email": "test2@gmail.com" },
    "deleted": false, "createdAt": "2025-12-18T15:36:07.198Z", "updatedAt": "2025-12-18T15:36:07.198Z", "__v": 0
  },
  {
    "name": "Update User",
    "apiPath": "/api/v1/users/:id",
    "method": "PATCH",
    "module": "USERS",
    "createBy": { "_id": "691495144b0016ecd62a647e", "email": "test2@gmail.com" },
    "deleted": false, "createdAt": "2025-12-18T15:36:07.198Z", "updatedAt": "2025-12-18T15:36:07.198Z", "__v": 0
  },
  {
    "name": "Delete User",
    "apiPath": "/api/v1/users/:id",
    "method": "DELETE",
    "module": "USERS",
    "createBy": { "_id": "691495144b0016ecd62a647e", "email": "test2@gmail.com" },
    "deleted": false, "createdAt": "2025-12-18T15:36:07.198Z", "updatedAt": "2025-12-18T15:36:07.198Z", "__v": 0
  },

  /* ===================== MODULE: COMPANIES (5 quyền) ===================== */
  {
    "name": "Create a new Company",
    "apiPath": "/api/v1/companies",
    "method": "POST",
    "module": "COMPANIES",
    "createBy": { "_id": "691495144b0016ecd62a647e", "email": "test2@gmail.com" },
    "deleted": false, "createdAt": "2025-12-18T15:36:07.198Z", "updatedAt": "2025-12-18T15:36:07.198Z", "__v": 0
  },
  {
    "name": "Get Company with paginate",
    "apiPath": "/api/v1/companies",
    "method": "GET",
    "module": "COMPANIES",
    "createBy": { "_id": "691495144b0016ecd62a647e", "email": "test2@gmail.com" },
    "deleted": false, "createdAt": "2025-12-18T15:36:07.198Z", "updatedAt": "2025-12-18T15:36:07.198Z", "__v": 0
  },
  {
    "name": "Get Company by id",
    "apiPath": "/api/v1/companies/:id",
    "method": "GET",
    "module": "COMPANIES",
    "createBy": { "_id": "691495144b0016ecd62a647e", "email": "test2@gmail.com" },
    "deleted": false, "createdAt": "2025-12-18T15:36:07.198Z", "updatedAt": "2025-12-18T15:36:07.198Z", "__v": 0
  },
  {
    "name": "Update Company",
    "apiPath": "/api/v1/companies/:id",
    "method": "PATCH",
    "module": "COMPANIES",
    "createBy": { "_id": "691495144b0016ecd62a647e", "email": "test2@gmail.com" },
    "deleted": false, "createdAt": "2025-12-18T15:36:07.198Z", "updatedAt": "2025-12-18T15:36:07.198Z", "__v": 0
  },
  {
    "name": "Delete Company",
    "apiPath": "/api/v1/companies/:id",
    "method": "DELETE",
    "module": "COMPANIES",
    "createBy": { "_id": "691495144b0016ecd62a647e", "email": "test2@gmail.com" },
    "deleted": false, "createdAt": "2025-12-18T15:36:07.198Z", "updatedAt": "2025-12-18T15:36:07.198Z", "__v": 0
  },

  /* ===================== MODULE: JOBS (5 quyền) ===================== */
  {
    "name": "Create a new Job",
    "apiPath": "/api/v1/jobs",
    "method": "POST",
    "module": "JOBS",
    "createBy": { "_id": "691495144b0016ecd62a647e", "email": "test2@gmail.com" },
    "deleted": false, "createdAt": "2025-12-18T15:36:07.198Z", "updatedAt": "2025-12-18T15:36:07.198Z", "__v": 0
  },
  {
    "name": "Get Job with paginate",
    "apiPath": "/api/v1/jobs",
    "method": "GET",
    "module": "JOBS",
    "createBy": { "_id": "691495144b0016ecd62a647e", "email": "test2@gmail.com" },
    "deleted": false, "createdAt": "2025-12-18T15:36:07.198Z", "updatedAt": "2025-12-18T15:36:07.198Z", "__v": 0
  },
  {
    "name": "Get Job by id",
    "apiPath": "/api/v1/jobs/:id",
    "method": "GET",
    "module": "JOBS",
    "createBy": { "_id": "691495144b0016ecd62a647e", "email": "test2@gmail.com" },
    "deleted": false, "createdAt": "2025-12-18T15:36:07.198Z", "updatedAt": "2025-12-18T15:36:07.198Z", "__v": 0
  },
  {
    "name": "Update Job",
    "apiPath": "/api/v1/jobs/:id",
    "method": "PATCH",
    "module": "JOBS",
    "createBy": { "_id": "691495144b0016ecd62a647e", "email": "test2@gmail.com" },
    "deleted": false, "createdAt": "2025-12-18T15:36:07.198Z", "updatedAt": "2025-12-18T15:36:07.198Z", "__v": 0
  },
  {
    "name": "Delete Job",
    "apiPath": "/api/v1/jobs/:id",
    "method": "DELETE",
    "module": "JOBS",
    "createBy": { "_id": "691495144b0016ecd62a647e", "email": "test2@gmail.com" },
    "deleted": false, "createdAt": "2025-12-18T15:36:07.198Z", "updatedAt": "2025-12-18T15:36:07.198Z", "__v": 0
  },

  /* ===================== MODULE: PERMISSIONS (5 quyền) ===================== */
  {
    "name": "Create a new Permission",
    "apiPath": "/api/v1/permissions",
    "method": "POST",
    "module": "PERMISSIONS",
    "createBy": { "_id": "691495144b0016ecd62a647e", "email": "test2@gmail.com" },
    "deleted": false, "createdAt": "2025-12-18T15:36:07.198Z", "updatedAt": "2025-12-18T15:36:07.198Z", "__v": 0
  },
  {
    "name": "Get Permission with paginate",
    "apiPath": "/api/v1/permissions",
    "method": "GET",
    "module": "PERMISSIONS",
    "createBy": { "_id": "691495144b0016ecd62a647e", "email": "test2@gmail.com" },
    "deleted": false, "createdAt": "2025-12-18T15:36:07.198Z", "updatedAt": "2025-12-18T15:36:07.198Z", "__v": 0
  },
  {
    "name": "Get Permission by id",
    "apiPath": "/api/v1/permissions/:id",
    "method": "GET",
    "module": "PERMISSIONS",
    "createBy": { "_id": "691495144b0016ecd62a647e", "email": "test2@gmail.com" },
    "deleted": false, "createdAt": "2025-12-18T15:36:07.198Z", "updatedAt": "2025-12-18T15:36:07.198Z", "__v": 0
  },
  {
    "name": "Update Permission",
    "apiPath": "/api/v1/permissions/:id",
    "method": "PATCH",
    "module": "PERMISSIONS",
    "createBy": { "_id": "691495144b0016ecd62a647e", "email": "test2@gmail.com" },
    "deleted": false, "createdAt": "2025-12-18T15:36:07.198Z", "updatedAt": "2025-12-18T15:36:07.198Z", "__v": 0
  },
  {
    "name": "Delete Permission",
    "apiPath": "/api/v1/permissions/:id",
    "method": "DELETE",
    "module": "PERMISSIONS",
    "createBy": { "_id": "691495144b0016ecd62a647e", "email": "test2@gmail.com" },
    "deleted": false, "createdAt": "2025-12-18T15:36:07.198Z", "updatedAt": "2025-12-18T15:36:07.198Z", "__v": 0
  },

  /* ===================== MODULE: ROLES (5 quyền) ===================== */
  {
    "name": "Create a new Role",
    "apiPath": "/api/v1/roles",
    "method": "POST",
    "module": "ROLES",
    "createBy": { "_id": "691495144b0016ecd62a647e", "email": "test2@gmail.com" },
    "deleted": false, "createdAt": "2025-12-18T15:36:07.198Z", "updatedAt": "2025-12-18T15:36:07.198Z", "__v": 0
  },
  {
    "name": "Get Role with paginate",
    "apiPath": "/api/v1/roles",
    "method": "GET",
    "module": "ROLES",
    "createBy": { "_id": "691495144b0016ecd62a647e", "email": "test2@gmail.com" },
    "deleted": false, "createdAt": "2025-12-18T15:36:07.198Z", "updatedAt": "2025-12-18T15:36:07.198Z", "__v": 0
  },
  {
    "name": "Get Role by id",
    "apiPath": "/api/v1/roles/:id",
    "method": "GET",
    "module": "ROLES",
    "createBy": { "_id": "691495144b0016ecd62a647e", "email": "test2@gmail.com" },
    "deleted": false, "createdAt": "2025-12-18T15:36:07.198Z", "updatedAt": "2025-12-18T15:36:07.198Z", "__v": 0
  },
  {
    "name": "Update Role",
    "apiPath": "/api/v1/roles/:id",
    "method": "PATCH",
    "module": "ROLES",
    "createBy": { "_id": "691495144b0016ecd62a647e", "email": "test2@gmail.com" },
    "deleted": false, "createdAt": "2025-12-18T15:36:07.198Z", "updatedAt": "2025-12-18T15:36:07.198Z", "__v": 0
  },
  {
    "name": "Delete Role",
    "apiPath": "/api/v1/roles/:id",
    "method": "DELETE",
    "module": "ROLES",
    "createBy": { "_id": "691495144b0016ecd62a647e", "email": "test2@gmail.com" },
    "deleted": false, "createdAt": "2025-12-18T15:36:07.198Z", "updatedAt": "2025-12-18T15:36:07.198Z", "__v": 0
  },

  /* ===================== MODULE: FILES (1 quyền) ===================== */
  {
    "name": "Upload file",
    "apiPath": "/api/v1/files/upload",
    "method": "POST",
    "module": "FILES",
    "createBy": { "_id": "691495144b0016ecd62a647e", "email": "test2@gmail.com" },
    "deleted": false, "createdAt": "2025-12-18T15:36:07.198Z", "updatedAt": "2025-12-18T15:36:07.198Z", "__v": 0
  }
]