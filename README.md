# פרויקט Online Store

פרויקט Full Stack לניהול חנות רכבים אונליין.

## מבנה הפרויקט

- **Backend**: ASP.NET Core 9.0 Web API עם SQL Server
- **Frontend**: React 18 עם Material-UI

## דרישות מערכת

- .NET 9.0 SDK או חדש יותר
- SQL Server Express או חדש יותר (כולל LocalDB)
- Node.js 16 או חדש יותר
- npm או yarn

## הוראות הרצה

### 1. הכנה

וודא שיש לך:
- SQL Server מופעל במחשב
- .NET 9.0 SDK מותקן
- Node.js מותקן

### 2. הגדרת Backend

1. פתח את הקובץ `appsettings.json` בתיקיית `BackendProject/BackendProject.Api/`
2. בדוק או שנה את ה-connection string לפי שרת ה-SQL Server שלך:
   ```json
   "DefaultConnection": "Server=DESKTOP-SITOH3J;Database=BackendProject;Trusted_Connection=True;MultipleActiveResultSets=true;TrustServerCertificate=True;"
   ```
   
   אם שרת ה-SQL Server שלך שונה, החלף את `DESKTOP-SITOH3J` בשם השרת שלך.
   
   **אפשרויות נוספות:**
   - SQL Server Express: `Server=YOUR_SERVER_NAME\\SQLEXPRESS;...`
   - LocalDB: `Server=(localdb)\\mssqllocaldb;...`
   - SQL Server רגיל: `Server=YOUR_SERVER_NAME;...`

3. פתח terminal ושוט אל תיקיית ה-Backend:
   ```bash
   cd BackendProject
   ```

4. הפעל את השרת:
   ```bash
   dotnet run --project BackendProject.Api/BackendProject.Api.csproj
   ```

   או אם אתה כבר בתיקיית BackendProject.Api:
   ```bash
   dotnet run
   ```

5. השרת יפתח על `https://localhost:5001` או `http://localhost:5000`
6. עבור ל-`https://localhost:5001/swagger` לצפייה ב-Swagger UI
7. ה-API כולל seeding אוטומטי שממלא את הדאטאבייס עם נתוני דמו

### 3. הגדרת Frontend

1. פתח terminal חדש ושוט אל תיקיית ה-Frontend:
   ```bash
   cd frontend
   ```

2. התקן dependencies:
   ```bash
   npm install
   ```

3. הפעל את השרת:
   ```bash
   npm start
   ```

4. האפליקציה תפתח אוטומטית בדפדפן על `http://localhost:3000`

## משתמשי דמו

לאחר הרצה ראשונה, נוצרים 2 משתמשים לדמו:
- **משתמש 1**: `john_doe` / `password123`
- **משתמש 2**: `jane_smith` / `password123`

## Features

- **Backend**:
  - JWT Authentication
  - Entity Framework Core עם SQL Server
  - RESTful API עם Swagger documentation
  - CORS מוגדר ל-React app
  - AutoMapper למיפוי אובייקטים
  - Seeding אוטומטי של DB

- **Frontend**:
  - React עם Redux Toolkit
  - Material-UI לתצוגה מודרנית
  - Routing עם React Router
  - אינטגרציה עם Backend API

## Endpoints

### Authentication
- `POST /api/auth/login` - התחברות
- `POST /api/auth/register` - הרשמה
- `GET /api/auth/me` - קבלת פרטי משתמש נוכחי (requires auth)
- `PUT /api/auth/update` - עדכון פרטי משתמש (requires auth)

### Products (רכבים)
- `GET /api/products` - רשימת כל הרכבים
- `GET /api/products/{id}` - רכב ספציפי
- `GET /api/products/category/{categoryId}` - רכבים לפי קטגוריה
- `POST /api/products` - יצירת רכב חדש (requires auth)
- `PUT /api/products/{id}` - עדכון רכב (requires auth)
- `DELETE /api/products/{id}` - מחיקת רכב (requires auth)

### Drivers (נהגים)
- `GET /api/drivers` - רשימת כל הנהגים
- `GET /api/drivers/{id}` - נהג ספציפי
- `PUT /api/drivers/{id}` - עדכון נהג (requires auth)
- `DELETE /api/drivers/{id}` - מחיקת נהג (requires auth)

### Items (אביזרים)
- `GET /api/items` - רשימת כל האביזרים
- `GET /api/items/{id}` - אביזר ספציפי
- `PUT /api/items/{id}` - עדכון אביזר (requires auth)
- `DELETE /api/items/{id}` - מחיקת אביזר (requires auth)

### Orders (הזמנות)
- `GET /api/orders` - רשימת כל ההזמנות (requires auth)
- `GET /api/orders/user` - הזמנות של המשתמש הנוכחי (requires auth)
- `GET /api/orders/{id}` - הזמנה ספציפית (requires auth)
- `POST /api/orders` - יצירת הזמנה חדשה (requires auth)
- `DELETE /api/orders/{id}` - מחיקת הזמנה (requires auth)

### Categories (קטגוריות)
- `GET /api/categories` - רשימת כל הקטגוריות
- `GET /api/categories/{id}` - קטגוריה ספציפית
- `PUT /api/categories/{id}` - עדכון קטגוריה (requires auth)
- `DELETE /api/categories/{id}` - מחיקת קטגוריה (requires auth)

### Seed (טעינת נתונים)
- `POST /api/seed/load-data` - טעינת נתוני דמו (requires auth)

### Users (משתמשים)
- `GET /api/users/{id}` - משתמש ספציפי
- `POST /api/users/register` - הרשמה
- `POST /api/users/login` - התחברות
- `PUT /api/users/{id}` - עדכון משתמש (requires auth)
- `DELETE /api/users/{id}` - מחיקת משתמש (requires auth)

## פתרון בעיות

### בעיות עם SQL Server Connection
- וודא ש-SQL Server בשימוש
- בדוק שהשם של השרת ב-connection string נכון
- נסה להשתמש ב-`(localdb)\\mssqllocaldb` במקום שם השרת

### בעיות עם Dependencies
- אם יש בעיות ב-backend, רץ: `dotnet restore`
- אם יש בעיות ב-frontend, רץ: `npm install` שוב
- מחק את התיקיות `node_modules` ו-`package-lock.json` והרץ מחדש

### Port כבר בשימוש
- שים לב שהתוכנית `BackendProject.Api` ב-Visual Studio תופסת פורט
- סגור את Visual Studio לפני הרצה מ-terminal
- או שנה את הפורטים ב-`Properties/launchSettings.json`

## צעדים נוספים

1. בחר ממשק מפותח (Stripe, PayPal)
2. הוסף שכבת אימות מתקדמת
3. הוסף ספריות בדיקות
4. הגדר CI/CD

## תמיכה

לשאלות או בעיות, צור issue ב-repository.

