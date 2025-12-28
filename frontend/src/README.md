# חנות מקוונת - Full Stack Project

פרויקט חנות מקוונת עם Frontend ב-React ו-Backend ב-.NET

## דרישות מערכת

- Node.js (גרסה 16 ומעלה)
- npm או yarn
- .NET 6.0 SDK ומעלה
- SQL Server או SQL Server Express

## התקנה והרצה

### Frontend (React)

1. התקן dependencies:
```bash
npm install
```

2. הרץ את הפרויקט:
```bash
npm start
```

האפליקציה תיפתח ב-http://localhost:3000

### Backend (.NET)

1. פתח את פרויקט ה-.NET
2. עדכן את connection string ב-`appsettings.json`
3. הרץ migrations:
```bash
dotnet ef database update
```

4. הרץ את השרת:
```bash
dotnet run
```

השרת יפעל ב-https://localhost:7000

## מבנה הפרויקט

### Frontend Features

- **אימות משתמשים**: הרשמה, התחברות, התנתקות
- **ניהול מוצרים**: צפייה במוצרים, פרטי מוצר
- **עגלת קניות**: הוספה, עדכון כמות, מחיקה
- **ניהול הזמנות**: יצירת הזמנה, צפייה בהזמנות, מחיקת הזמנה
- **פרופיל משתמש**: עדכון פרטים אישיים

### Backend API Endpoints

#### אימות משתמשים
- `POST /api/auth/register` - הרשמה
- `POST /api/auth/login` - התחברות
- `GET /api/auth/me` - קבלת פרטי משתמש נוכחי
- `PUT /api/auth/update` - עדכון פרטי משתמש

#### מוצרים
- `GET /api/products` - רשימת מוצרים
- `GET /api/products/{id}` - פרטי מוצר ספציפי
- `GET /api/products/category/{categoryId}` - מוצרים לפי קטגוריה

#### הזמנות
- `POST /api/orders` - יצירת הזמנה חדשה
- `GET /api/orders/user` - הזמנות של המשתמש
- `GET /api/orders/{id}` - פרטי הזמנה ספציפית
- `DELETE /api/orders/{id}` - מחיקת הזמנה
- `PUT /api/orders/{id}/payment` - עדכון סטטוס תשלום

## מבנה מסד הנתונים

### טבלאות

- **Users**: פרטי משתמשים
- **Products**: פרטי מוצרים
- **Orders**: הזמנות
- **Categories**: קטגוריות מוצרים

## טכנולוגיות

### Frontend
- React 18
- Redux Toolkit
- React Router
- Material-UI
- Axios
- CSS3

### Backend
- .NET 6
- Entity Framework Core
- SQL Server
- JWT Authentication
- Swagger/OpenAPI

## פיתוח נוסף

1. הוספת תשלומים אמיתיים (Stripe, PayPal)
2. מערכת הודעות (Email, SMS)
3. מערכת ביקורות ודירוגים
4. מערכת הנחות וקופונים
5. מערכת מלאי
6. דשבורד מנהל
