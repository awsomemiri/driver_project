import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div>
      <h1>שגיאה 404</h1>
      <p>המותג או המוצר לא נמצא</p>
      <Link to="/products" style={{ color: 'blue' }}>חזרה לדף המוצרים</Link>
    </div>
  );
}

export default NotFound
