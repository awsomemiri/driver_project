import React from 'react';

function AboutPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#000', color: '#C0C0C0', padding: '1.5rem' }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        backgroundColor: '#1a1a1a',
        borderRadius: '20px',
        padding: '1rem',
        boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)'
      }}>
        <h1 style={{
          fontSize: '3rem',
          fontWeight: 'bold',
          textAlign: 'center',
          color: '#C0C0C0',
          marginBottom: '0.5rem'
        }}>
          אודותינו
        </h1>

        <p style={{
          fontSize: '1.25rem',
          lineHeight: '1.75',
          color: '#C0C0C0',
          marginBottom: '2rem'
        }}>
        <span style={{ fontWeight: 'bold', color: '#C0C0C0' }}> CarKingברוכים הבאים ל־</span> <br></br>
          — האתר המוביל להשכרה לפי ימים של רכבים, דרייברים ומוצרים טכנולוגיים מתקדמים.
          אצלנו תיהנו ממחירים זולים במיוחד, רכבים משוכללים, ונהגים מקצוענים מהשורה הראשונה.
          בנוסף, אנו מציעים מגוון רחב של מוצרים טכנולוגיים חדשניים להשכרה, הכל באיכות גבוהה ובתנאים נוחים.
          השירות שלנו מותאם אישית לצרכים שלכם — חווית השכרה מקצועית, פשוטה ומשתלמת.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '2rem',
          textAlign: 'center'
        }}>
          <div style={{
            backgroundColor: '#333',
            borderRadius: '15px',
            padding: '2rem',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#C0C0C0' }}>
              מחירים נוחים
            </h3>
            <p style={{ fontSize: '1rem', color: '#C0C0C0' }}>
              המחירים שלנו מהזולים בשוק — בלי להתפשר על האיכות.
            </p>
          </div>

          <div style={{
            backgroundColor: '#333',
            borderRadius: '15px',
            padding: '2rem',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#C0C0C0' }}>
              רכבים מתקדמים
            </h3>
            <p style={{ fontSize: '1rem', color: '#C0C0C0' }}>
              צי רכבים חדיש ומושקע שמתאים לכל צורך ולכל מטרה.
            </p>
          </div>

          <div style={{
            backgroundColor: '#333',
            borderRadius: '15px',
            padding: '2rem',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#C0C0C0' }}>
              שירות מקצועי
            </h3>
            <p style={{ fontSize: '1rem', color: '#C0C0C0' }}>
              צוות הדרייברים שלנו מוביל בתחום, עם יחס אישי ושירות ברמה הגבוהה ביותר.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
