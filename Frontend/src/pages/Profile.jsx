import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit2, Mail, MapPin, Phone, LogOut, Settings, Shield, Bell, Check, X } from 'lucide-react';
import { useUser } from '../context/UserContext';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, logout, updateProfile } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '+92 300 1234567',
    address: 'Islamabad, Pakistan'
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '+92 300 1234567',
    address: 'Islamabad, Pakistan'
  });

  useEffect(() => {
    if (user) {
      setProfile({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '+92 300 1234567',
        address: user.address || 'Bahawalpur, Pakistan',
      });
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '+92 300 1234567',
        address: user.address || 'Bahawalpur, Pakistan'
      });
    } else {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleEdit = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch("http://localhost:5000/api/users/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setProfile(formData);
        updateProfile(formData);
        alert("Profile updated successfully!");
      } else {
        alert(data.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile");
    }
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  if (!user) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingSpinner} />
      </div>
    );
  }

  return (
    <div style={styles.page}>
      {/* Background decoration */}
      <div style={styles.bgTop} />

      <div style={styles.wrapper}>
        {/* Page Header */}
        <div style={styles.pageHeader}>
          <h1 style={styles.pageTitle}>My Profile</h1>
          <p style={styles.pageSubtitle}>Manage your personal information and preferences</p>
        </div>

        <div style={styles.grid}>
          {/* Left Column - Avatar Card */}
          <div style={styles.avatarCard}>
            <div style={styles.avatarCircle}>
              <span style={styles.initials}>{getInitials(profile.name)}</span>
            </div>
            <h2 style={styles.avatarName}>{profile.name || 'Your Name'}</h2>
            <p style={styles.avatarSub}>{profile.email}</p>
            <div style={styles.badge}>
              <span style={styles.badgeDot} />
              Active Member
            </div>
            <div style={styles.divider} />
            <p style={styles.memberText}>Member since 2024</p>
          </div>

          {/* Right Column */}
          <div style={styles.rightCol}>
            {/* Info Card */}
            <div style={styles.card}>
              <div style={styles.cardHeader}>
                <h3 style={styles.cardTitle}>Personal Information</h3>
                <div style={styles.editActions}>
                  {isEditing ? (
                    <>
                      <button onClick={handleSave} style={styles.saveBtn}>
                        <Check size={15} style={{ marginRight: '6px' }} />
                        Save
                      </button>
                      <button onClick={() => setIsEditing(false)} style={styles.cancelBtn}>
                        <X size={15} />
                      </button>
                    </>
                  ) : (
                    <button onClick={() => setIsEditing(true)} style={styles.editBtn}>
                      <Edit2 size={15} style={{ marginRight: '6px' }} />
                      Edit
                    </button>
                  )}
                </div>
              </div>

              <div style={styles.fieldGrid}>
                {/* Name */}
                <div style={styles.fieldGroup}>
                  <label style={styles.fieldLabel}>Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleEdit('name', e.target.value)}
                      style={styles.input}
                      placeholder="Full Name"
                    />
                  ) : (
                    <div style={styles.fieldRow}>
                      <div style={styles.fieldIcon}><span style={styles.fieldEmoji}>👤</span></div>
                      <p style={styles.fieldValue}>{profile.name || '—'}</p>
                    </div>
                  )}
                </div>

                {/* Email */}
                <div style={styles.fieldGroup}>
                  <label style={styles.fieldLabel}>Email Address</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleEdit('email', e.target.value)}
                      style={styles.input}
                      placeholder="Email"
                    />
                  ) : (
                    <div style={styles.fieldRow}>
                      <div style={styles.fieldIcon}><Mail size={15} color="#6366f1" /></div>
                      <p style={styles.fieldValue}>{profile.email || '—'}</p>
                    </div>
                  )}
                </div>

                {/* Phone */}
                <div style={styles.fieldGroup}>
                  <label style={styles.fieldLabel}>Phone Number</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleEdit('phone', e.target.value)}
                      style={styles.input}
                      placeholder="Phone"
                    />
                  ) : (
                    <div style={styles.fieldRow}>
                      <div style={styles.fieldIcon}><Phone size={15} color="#6366f1" /></div>
                      <p style={styles.fieldValue}>{profile.phone || '—'}</p>
                    </div>
                  )}
                </div>

                {/* Address */}
                <div style={styles.fieldGroup}>
                  <label style={styles.fieldLabel}>Address</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => handleEdit('address', e.target.value)}
                      style={styles.input}
                      placeholder="Address"
                    />
                  ) : (
                    <div style={styles.fieldRow}>
                      <div style={styles.fieldIcon}><MapPin size={15} color="#6366f1" /></div>
                      <p style={styles.fieldValue}>{profile.address || '—'}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Settings Card */}
            <div style={styles.card}>
              <div style={styles.cardHeader}>
                <h3 style={styles.cardTitle}>Account Settings</h3>
              </div>

              <div style={styles.settingRow}>
                <div style={styles.settingLeft}>
                  <div style={{ ...styles.settingIconWrap, background: '#eef2ff' }}>
                    <Shield size={16} color="#6366f1" />
                  </div>
                  <div>
                    <p style={styles.settingName}>Two-Factor Authentication</p>
                    <p style={styles.settingDesc}>Add an extra layer of security</p>
                  </div>
                </div>
                <label style={styles.toggleWrap}>
                  <input type="checkbox" defaultChecked style={{ display: 'none' }} />
                  <div style={styles.toggleTrackOn}>
                    <div style={styles.toggleThumbOn} />
                  </div>
                </label>
              </div>

              <div style={styles.settingRow}>
                <div style={styles.settingLeft}>
                  <div style={{ ...styles.settingIconWrap, background: '#fef3c7' }}>
                    <Bell size={16} color="#d97706" />
                  </div>
                  <div>
                    <p style={styles.settingName}>Email Notifications</p>
                    <p style={styles.settingDesc}>Receive updates and alerts</p>
                  </div>
                </div>
                <label style={styles.toggleWrap}>
                  <input type="checkbox" defaultChecked style={{ display: 'none' }} />
                  <div style={styles.toggleTrackOn}>
                    <div style={styles.toggleThumbOn} />
                  </div>
                </label>
              </div>
            </div>

            {/* Logout Button */}
            <button onClick={handleLogout} style={styles.logoutBtn}>
              <LogOut size={16} style={{ marginRight: '8px' }} />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    background: '#f5f6fa',
    fontFamily: '"Inter", "Segoe UI", sans-serif',
    position: 'relative',
    overflow: 'hidden',
  },
  bgTop: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: '260px',
    background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)',
    zIndex: 0,
  },
  loadingContainer: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#f5f6fa',
  },
  loadingSpinner: {
    width: '40px',
    height: '40px',
    border: '3px solid #e0e0e0',
    borderTop: '3px solid #6366f1',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  },
  wrapper: {
    position: 'relative',
    zIndex: 1,
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '48px 20px 60px',
  },
  pageHeader: {
    textAlign: 'center',
    marginBottom: '40px',
  },
  pageTitle: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#ffffff',
    margin: '0 0 8px',
    letterSpacing: '-0.5px',
  },
  pageSubtitle: {
    fontSize: '15px',
    color: 'rgba(255,255,255,0.7)',
    margin: 0,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '260px 1fr',
    gap: '24px',
    alignItems: 'start',
  },
  // Avatar Card
  avatarCard: {
    background: '#ffffff',
    borderRadius: '16px',
    padding: '32px 24px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 8px 24px rgba(0,0,0,0.06)',
    textAlign: 'center',
  },
  avatarCircle: {
    width: '88px',
    height: '88px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #4338ca 0%, #7c3aed 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 16px',
    boxShadow: '0 4px 16px rgba(99,102,241,0.35)',
  },
  initials: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: '1px',
  },
  avatarName: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#1e1b4b',
    margin: '0 0 4px',
  },
  avatarSub: {
    fontSize: '13px',
    color: '#9ca3af',
    margin: '0 0 16px',
    wordBreak: 'break-all',
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    background: '#ecfdf5',
    color: '#059669',
    fontSize: '12px',
    fontWeight: '600',
    padding: '5px 12px',
    borderRadius: '20px',
  },
  badgeDot: {
    width: '7px',
    height: '7px',
    borderRadius: '50%',
    background: '#10b981',
  },
  divider: {
    height: '1px',
    background: '#f3f4f6',
    margin: '20px 0',
  },
  memberText: {
    fontSize: '12px',
    color: '#9ca3af',
    margin: 0,
  },
  // Right Column
  rightCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  card: {
    background: '#ffffff',
    borderRadius: '16px',
    padding: '28px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 8px 24px rgba(0,0,0,0.06)',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
    paddingBottom: '16px',
    borderBottom: '1px solid #f3f4f6',
  },
  cardTitle: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#111827',
    margin: 0,
  },
  editActions: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
  },
  editBtn: {
    display: 'flex',
    alignItems: 'center',
    background: '#eef2ff',
    color: '#4338ca',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '600',
    transition: 'background 0.2s',
  },
  saveBtn: {
    display: 'flex',
    alignItems: 'center',
    background: '#4338ca',
    color: '#fff',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '600',
  },
  cancelBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#f3f4f6',
    color: '#6b7280',
    border: 'none',
    padding: '8px 10px',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  fieldGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
  },
  fieldGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  fieldLabel: {
    fontSize: '11px',
    fontWeight: '600',
    color: '#9ca3af',
    textTransform: 'uppercase',
    letterSpacing: '0.6px',
  },
  fieldRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    background: '#f9fafb',
    borderRadius: '8px',
    padding: '10px 14px',
  },
  fieldIcon: {
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
  },
  fieldEmoji: {
    fontSize: '15px',
  },
  fieldValue: {
    fontSize: '14px',
    color: '#374151',
    fontWeight: '500',
    margin: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  input: {
    width: '100%',
    padding: '10px 14px',
    border: '1.5px solid #e0e7ff',
    borderRadius: '8px',
    fontSize: '14px',
    fontFamily: 'inherit',
    color: '#374151',
    background: '#fafafa',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  },
  // Settings
  settingRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '14px 0',
    borderBottom: '1px solid #f9fafb',
  },
  settingLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
  },
  settingIconWrap: {
    width: '36px',
    height: '36px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  settingName: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#111827',
    margin: '0 0 2px',
  },
  settingDesc: {
    fontSize: '12px',
    color: '#9ca3af',
    margin: 0,
  },
  toggleWrap: {
    cursor: 'pointer',
  },
  toggleTrackOn: {
    width: '44px',
    height: '24px',
    borderRadius: '12px',
    background: '#4338ca',
    position: 'relative',
    transition: 'background 0.2s',
  },
  toggleThumbOn: {
    position: 'absolute',
    right: '3px',
    top: '3px',
    width: '18px',
    height: '18px',
    borderRadius: '50%',
    background: '#fff',
    boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
    transition: 'right 0.2s',
  },
  // Logout
  logoutBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#fff',
    color: '#dc2626',
    border: '1.5px solid #fecaca',
    padding: '13px',
    borderRadius: '12px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'background 0.2s, border-color 0.2s',
    width: '100%',
  },
};