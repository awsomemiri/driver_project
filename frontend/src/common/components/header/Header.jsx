import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../../features/auth/authSlice';

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const [showMenu, setShowMenu] = React.useState(false);

  const handleLogout = () => {
    dispatch(logoutUser());
    setShowMenu(false);
    navigate('/');
  };

  return (
    <>
      <header style={{
        backgroundColor: '#0a0a0a',
        color: 'white',
        padding: '1rem',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {/* לוגו */}
          <Link to="/" style={{
            fontSize: '30px',
            fontWeight: 'bold',
            color: '#ffffff',
            textDecoration: 'none',
            userSelect: 'none'
          }}>
            CarKing
          </Link>

          {/* כפתורי ניווט */}
          <nav style={{ display: 'flex', gap: '1.5rem', flexGrow: 1, justifyContent: 'center' }}>
            {[
              { label: 'home', path: '/' },
              { label: 'about', path: '/about' },
              { label: 'contact', path: '/contact' },
              { label: 'cars', path: '/ProductList' },
              { label: 'drivers', path: '/draiverlist' },
              { label: 'items', path: '/itemlist' }
            ].map(({ label, path }) => (
              <Link
                key={label}
                to={path}
                style={{
                  color: '#c0c0c0',
                  fontWeight: 500,
                  fontSize: '1.1rem',
                  textTransform: 'lowercase',
                  letterSpacing: '0.1em',
                  textDecoration: 'none',
                  padding: '6px 12px'
                }}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* כפתורי משתמש ואייקונים */}
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            {/* אייקונים */}
            <a
              href="https://waze.com/ul?ll=32.0853,34.7818&navigate=yes"
              target="_blank"
              rel="noopener"
              style={{ color: 'white', fontSize: '28px', textDecoration: 'none' }}
            >
              🧭
            </a>

            <a
              href="https://wa.me/972501234567"
              target="_blank"
              rel="noopener"
              style={{ color: '#25D366', fontSize: '28px', textDecoration: 'none' }}
            >
              💬
            </a>

            <Link to="/cart" style={{ color: 'white', fontSize: '28px', textDecoration: 'none' }}>
              🛒
            </Link>


            {/* הזמנות ופרופיל */}
            {isAuthenticated ? (
              <>
                <Link
                  to="/orders"
                  style={{
                    color: '#c0c0c0',
                    fontWeight: 500,
                    fontSize: '1rem',
                    textDecoration: 'none'
                  }}
                >
                  הזמנות שלי
                </Link>
                <div style={{ position: 'relative' }}>
                  <button
                    onClick={() => setShowMenu(!showMenu)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'white',
                      cursor: 'pointer',
                      fontSize: '28px'
                    }}
                  >
                    👤
                  </button>
                  {showMenu && (
                    <div style={{
                      position: 'absolute',
                      top: '100%',
                      right: 0,
                      backgroundColor: 'white',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      padding: '8px 0',
                      minWidth: '120px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}>
                      <Link
                        to="/profile"
                        style={{
                          display: 'block',
                          padding: '8px 16px',
                          color: '#333',
                          textDecoration: 'none'
                        }}
                        onClick={() => setShowMenu(false)}
                      >
                        פרופיל
                      </Link>
                      <button
                        onClick={handleLogout}
                        style={{
                          width: '100%',
                          padding: '8px 16px',
                          background: 'none',
                          border: 'none',
                          color: '#333',
                          cursor: 'pointer',
                          textAlign: 'left'
                        }}
                      >
                        התנתקות
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <Link
                to="/login"
                style={{
                  color: '#c0c0c0',
                  fontWeight: 500,
                  fontSize: '1rem',
                  textDecoration: 'none'
                }}
              >
                התחברות
              </Link>
            )}
          </div>
        </div>
      </header>

      <div style={{
        height: '3px',
        backgroundColor: '#fff',
        boxShadow: '0 0 8px 2px rgba(232, 79, 79, 0.8)',
        borderRadius: '3px',
        marginTop: '-6px',
        position: 'sticky',
        top: '64px',
        zIndex: 1000
      }} />
    </>
  );
}

// Helper component for internal links
function Link({ to, children, style, onClick }) {
  return (
    <RouterLink to={to} style={style} onClick={onClick}>
      {children}
    </RouterLink>
  );
}