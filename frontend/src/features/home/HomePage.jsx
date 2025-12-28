import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const navOptions = [
    { to: '/productlist', label: 'השכרת רכבים' },
    { to: '/draiverlist', label: 'בחירת דרייבר' },
    { to: '/itemlist', label: 'מוצרים לרכב' },
  ];

  const services = [
    {
      title: 'אישי VIP שירות',
      desc: 'נהגים מקצועיים בהתאמה אישית לכל לקוח',
    },
    {
      title: 'רכבים יוקרתיים',
      desc: 'צי רכבים חדיש ומפנק להשכרה יומית או ארוכת טווח',
    },
    {
      title: 'אביזרים לרכב',
      desc: 'עמדות טעינה , מערכת מולטימדיה , כיסא תינוק ועוד',
    },
    {
      title: 'ביטוח מלא',
      desc: 'ביטוח מקיף לכל נסיעה - שקט נפשי מובטח',
    },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #121212, #282727)',
      color: 'white',
      fontFamily: 'Roboto, sans-serif',
    }}>
      {/* Video Section */}
      <div style={{
        position: 'relative',
        height: '60vh',
        overflow: 'hidden'
      }}>
        <video
          autoPlay
          loop
          muted
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        >
          <source src="/video/10 מכוניות היוקרה המובילות בעולם! 2024 00_00_08-00_09_47.mp4" type="video/mp4" />
          הדפדפן שלך אינו תומך בווידאו.
        </video>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1rem' }}>
        {/* ניווט */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          {navOptions.map((item, idx) => (
            <Link
              key={idx}
              to={item.to}
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                padding: '1.5rem',
                borderRadius: '12px',
                textDecoration: 'none',
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: '1.2rem',
                boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                transition: 'transform 0.3s ease'
              }}
              onMouseOver={(e) => e.target.style.transform = 'translateY(-5px)'}
              onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* כותרת ותיאור */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{
            fontSize: '2.5rem',
            background: 'linear-gradient(45deg, #00c6ff, #0072ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '1rem'
          }}>
            השכרת רכב עם דרייבר
          </h1>

          <hr style={{ borderColor: 'gray', margin: '1rem auto', width: '60%' }} />

          <p style={{
            fontSize: '1.2rem',
            color: '#cccccc',
            maxWidth: '800px',
            margin: '0 auto 2rem'
          }}>
            בין אם אתם צריכים רכב מפואר, נהג אישי, או אביזרים לרכב – אנחנו כאן בשבילכם עם שירות נוח, בטוח ויוקרתי
          </p>
        </div>

        {/* כרטיסי שירות */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          {services.map((item, idx) => (
            <div
              key={idx}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                padding: '2rem',
                borderRadius: '12px',
                textAlign: 'center',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              <h3 style={{ color: '#ffffff', marginBottom: '1rem', fontSize: '1.3rem' }}>
                {item.title}
              </h3>
              <p style={{ color: '#cccccc', lineHeight: '1.6' }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* קריאה לפעולה */}
        <div style={{ textAlign: 'center' }}>
          <Link
            to="/contact"
            style={{
              background: 'linear-gradient(to right, #00c6ff, #0072ff)',
              color: 'white',
              padding: '1rem 2.5rem',
              borderRadius: '40px',
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              boxShadow: '0 4px 12px rgba(0, 123, 255, 0.4)',
              display: 'inline-block',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.background = 'linear-gradient(to right, #0072ff, #00c6ff)';
              e.target.style.boxShadow = '0 6px 20px rgba(0, 123, 255, 0.6)';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'linear-gradient(to right, #00c6ff, #0072ff)';
              e.target.style.boxShadow = '0 4px 12px rgba(0, 123, 255, 0.4)';
            }}
          >
            צרו קשר עוד היום →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;