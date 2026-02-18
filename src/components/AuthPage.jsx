import { useState, useEffect } from 'react'
import './AuthPage.css'

const uiText = {
  en: {
    signIn: 'Sign In',
    signUp: 'Create Account',
    email: 'Email Address',
    emailPlaceholder: 'Enter your email',
    sendOtp: 'Send Verification Code',
    sendingOtp: 'Sending...',
    otpSent: 'Code Sent',
    otp: 'Verification Code',
    otpPlaceholder: 'Enter 6-digit code',
    verify: 'Verify & Continue',
    verifying: 'Verifying...',
    resendOtp: 'Resend Code',
    resendIn: 'Resend in',
    seconds: 's',
    backToEmail: 'Use different email',
    signInSubtitle: 'Access your orders, inquiries, and saved information.',
    signUpSubtitle: 'Create an account to track orders and reorder faster.',
    newToBrand: 'New to Young Cosmed?',
    alreadyHaveAccount: 'Already have an account?',
    createAccount: 'Create Account',
    signInLink: 'Sign In',
    orContinueAs: 'or continue as',
    guest: 'Guest',
    guestNote: 'You can still inquire and order without an account.',
    benefits: {
      title: 'Member Benefits',
      items: [
        'Track all orders in one place',
        'Quick reorder with saved details',
        'Save favorite products',
        'Manage invoices & quotes',
        'Faster checkout with saved addresses'
      ]
    },
    errors: {
      invalidEmail: 'Please enter a valid email address',
      invalidOtp: 'Please enter a valid 6-digit code',
      otpExpired: 'Code expired. Please request a new one.',
      networkError: 'Network error. Please try again.'
    },
    success: {
      otpSent: 'Verification code sent to your email',
      verified: 'Successfully verified!'
    }
  },
  ko: {
    signIn: '로그인',
    signUp: '회원가입',
    email: '이메일 주소',
    emailPlaceholder: '이메일을 입력하세요',
    sendOtp: '인증번호 발송',
    sendingOtp: '발송 중...',
    otpSent: '발송 완료',
    otp: '인증번호',
    otpPlaceholder: '6자리 인증번호 입력',
    verify: '인증 및 계속하기',
    verifying: '인증 중...',
    resendOtp: '인증번호 재발송',
    resendIn: '재발송 가능',
    seconds: '초 후',
    backToEmail: '다른 이메일 사용',
    signInSubtitle: '주문, 문의, 저장된 정보에 접근하세요.',
    signUpSubtitle: '계정을 만들어 주문 추적과 빠른 재주문을 경험하세요.',
    newToBrand: 'Young Cosmed가 처음이신가요?',
    alreadyHaveAccount: '이미 계정이 있으신가요?',
    createAccount: '회원가입',
    signInLink: '로그인',
    orContinueAs: '또는',
    guest: '비회원으로 계속',
    guestNote: '계정 없이도 문의 및 주문이 가능합니다.',
    benefits: {
      title: '회원 혜택',
      items: [
        '모든 주문을 한 곳에서 추적',
        '저장된 정보로 빠른 재주문',
        '관심 제품 저장',
        '인보이스 및 견적서 관리',
        '저장된 주소로 빠른 결제'
      ]
    },
    errors: {
      invalidEmail: '유효한 이메일 주소를 입력해주세요',
      invalidOtp: '유효한 6자리 인증번호를 입력해주세요',
      otpExpired: '인증번호가 만료되었습니다. 다시 요청해주세요.',
      networkError: '네트워크 오류가 발생했습니다. 다시 시도해주세요.'
    },
    success: {
      otpSent: '인증번호가 이메일로 발송되었습니다',
      verified: '인증이 완료되었습니다!'
    }
  }
}

function AuthPage({ lang, onClose, onLogin }) {
  const [mode, setMode] = useState('signIn') // 'signIn' or 'signUp'
  const [step, setStep] = useState('email') // 'email' or 'otp'
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const [resendTimer, setResendTimer] = useState(0)

  const text = uiText[lang]

  // Resend timer countdown
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [resendTimer])

  // ESC key to close
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleSendOtp = async () => {
    setError('')
    setSuccessMsg('')

    if (!validateEmail(email)) {
      setError(text.errors.invalidEmail)
      return
    }

    setIsLoading(true)

    // Simulate OTP sending (replace with actual API call)
    await new Promise(resolve => setTimeout(resolve, 1500))

    // For demo: generate OTP and log to console
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString()
    console.log('Generated OTP:', generatedOtp)
    // Store in sessionStorage for demo verification
    sessionStorage.setItem('demo_otp', generatedOtp)
    sessionStorage.setItem('demo_email', email)

    setIsLoading(false)
    setSuccessMsg(text.success.otpSent)
    setStep('otp')
    setResendTimer(60)
  }

  const handleVerifyOtp = async () => {
    setError('')
    setSuccessMsg('')

    if (otp.length !== 6 || !/^\d{6}$/.test(otp)) {
      setError(text.errors.invalidOtp)
      return
    }

    setIsLoading(true)

    // Simulate verification (replace with actual API call)
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Demo verification: accept any 6-digit code for testing
    // In production, this would validate against actual OTP sent via email
    if (otp.length === 6) { // Accept any 6-digit code for demo
      setSuccessMsg(text.success.verified)

      // Create user session
      const user = {
        email: email,
        isLoggedIn: true,
        tier: 'Standard',
        createdAt: new Date().toISOString()
      }

      // Store in localStorage
      localStorage.setItem('beautylab_user', JSON.stringify(user))

      // Clean up demo data
      sessionStorage.removeItem('demo_otp')
      sessionStorage.removeItem('demo_email')

      // Notify parent and close after brief delay
      setTimeout(() => {
        onLogin(user)
        onClose()
      }, 800)
    }

    setIsLoading(false)
  }

  const handleResendOtp = async () => {
    if (resendTimer > 0) return
    await handleSendOtp()
  }

  const handleBackToEmail = () => {
    setStep('email')
    setOtp('')
    setError('')
    setSuccessMsg('')
  }

  const toggleMode = () => {
    setMode(mode === 'signIn' ? 'signUp' : 'signIn')
    setStep('email')
    setEmail('')
    setOtp('')
    setError('')
    setSuccessMsg('')
  }

  return (
    <div className="auth-overlay">
      <div className="auth-container">
        {/* Close button */}
        <button className="auth-close" onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="auth-content">
          {/* Left: Form */}
          <div className="auth-form-section">
            <div className="auth-form-header">
              <h1 className="auth-title">
                {mode === 'signIn' ? text.signIn : text.signUp}
              </h1>
              <p className="auth-subtitle">
                {mode === 'signIn' ? text.signInSubtitle : text.signUpSubtitle}
              </p>
            </div>

            <div className="auth-form">
              {step === 'email' ? (
                <>
                  <div className="form-field">
                    <label className="form-label">{text.email}</label>
                    <input
                      type="email"
                      className={`form-input ${error ? 'error' : ''}`}
                      placeholder={text.emailPlaceholder}
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        setError('')
                      }}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendOtp()}
                      autoFocus
                    />
                  </div>

                  {error && <p className="form-error">{error}</p>}

                  <button
                    className="auth-btn primary"
                    onClick={handleSendOtp}
                    disabled={isLoading || !email.trim()}
                  >
                    {isLoading ? text.sendingOtp : text.sendOtp}
                  </button>
                </>
              ) : (
                <>
                  <div className="otp-email-display">
                    <span>{email}</span>
                    <button className="change-email-btn" onClick={handleBackToEmail}>
                      {text.backToEmail}
                    </button>
                  </div>

                  <div className="form-field">
                    <label className="form-label">{text.otp}</label>
                    <input
                      type="text"
                      className={`form-input otp-input ${error ? 'error' : ''}`}
                      placeholder={text.otpPlaceholder}
                      value={otp}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '').slice(0, 6)
                        setOtp(val)
                        setError('')
                      }}
                      onKeyPress={(e) => e.key === 'Enter' && handleVerifyOtp()}
                      autoFocus
                      maxLength={6}
                    />
                  </div>

                  {error && <p className="form-error">{error}</p>}
                  {successMsg && <p className="form-success">{successMsg}</p>}

                  <button
                    className="auth-btn primary"
                    onClick={handleVerifyOtp}
                    disabled={isLoading || otp.length !== 6}
                  >
                    {isLoading ? text.verifying : text.verify}
                  </button>

                  <button
                    className="resend-btn"
                    onClick={handleResendOtp}
                    disabled={resendTimer > 0}
                  >
                    {resendTimer > 0
                      ? `${text.resendIn} ${resendTimer}${text.seconds}`
                      : text.resendOtp
                    }
                  </button>
                </>
              )}

              {/* Mode toggle */}
              <div className="auth-mode-toggle">
                <span>
                  {mode === 'signIn' ? text.newToBrand : text.alreadyHaveAccount}
                </span>
                <button className="mode-toggle-btn" onClick={toggleMode}>
                  {mode === 'signIn' ? text.createAccount : text.signInLink}
                </button>
              </div>

              {/* Guest option */}
              <div className="guest-option">
                <div className="divider">
                  <span>{text.orContinueAs}</span>
                </div>
                <button className="auth-btn secondary" onClick={onClose}>
                  {text.guest}
                </button>
                <p className="guest-note">{text.guestNote}</p>
              </div>
            </div>
          </div>

          {/* Right: Benefits */}
          <div className="auth-benefits-section">
            <div className="benefits-content">
              <h3 className="benefits-title">{text.benefits.title}</h3>
              <ul className="benefits-list">
                {text.benefits.items.map((item, index) => (
                  <li key={index}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M6 10l3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthPage
