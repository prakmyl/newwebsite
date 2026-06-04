import React, { useState, useRef, useEffect } from 'react';
import { Shield, Sparkles, Send, CheckCircle, Info, Lock } from 'lucide-react';
import { servicesData } from '../data/websiteData';
import { collection, addDoc, query, where, getDocs, Timestamp } from 'firebase/firestore';
import { getFirebaseDb } from '../firebase';

// Helper to prevent fetch requests from hanging indefinitely
const fetchWithTimeout = async (url: string, options: RequestInit = {}, timeout = 6000) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
};

interface ContactFormProps {
  initialService?: string;
  onExit?: () => void;
}

export default function ContactForm({ initialService = '', onExit }: ContactFormProps) {
  // Input fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedService, setSelectedService] = useState(initialService || servicesData[0].title);
  const [message, setMessage] = useState(
    'Can you call me back as I would like to know more about your IT/ITES/BPO/KPO Services?'
  );

  // Flow states
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [otpInputs, setOtpInputs] = useState(['', '', '', '', '', '']);
  const [otpError, setOtpError] = useState('');
  const [formError, setFormError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  // References for OTP input digits to automatically focus next box
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  // If initialService prop changes, update selectedService
  useEffect(() => {
    if (initialService) {
      setSelectedService(initialService);
    }
  }, [initialService]);

  // Timer effect for resending OTP countdown
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const isPublicEmailDomain = (domain: string): boolean => {
    const lowercase = domain.toLowerCase().trim();
    
    // 1. Precise check for Google/Gmail and their regional variations
    // E.g., gmail.com, googlemail.com, gmail.co.in, sub.gmail.com etc.
    const isGmail = lowercase === 'gmail' || 
                    lowercase === 'googlemail' ||
                    lowercase.startsWith('gmail.') || 
                    lowercase.startsWith('googlemail.') ||
                    lowercase.endsWith('.gmail') || 
                    lowercase.endsWith('.googlemail') ||
                    lowercase.includes('.gmail.') || 
                    lowercase.includes('.googlemail.') ||
                    /\bgmail\.[a-z]{2,}/i.test(lowercase) ||
                    /\bgooglemail\.[a-z]{2,}/i.test(lowercase);
    
    if (isGmail) return true;

    // 2. Precise check for Yahoo and its regional variations
    // E.g., yahoo.com, yahoo.co.in, yahoo.co.uk, sub.yahoo.com
    const isYahoo = lowercase === 'yahoo' || 
                    lowercase.startsWith('yahoo.') || 
                    lowercase.endsWith('.yahoo') || 
                    lowercase.includes('.yahoo.') ||
                    /\byahoo\b/i.test(lowercase);
                    
    if (isYahoo) return true;

    // 3. Microsoft consumer email domains (hotmail, outlook, live, msn)
    const isMicrosoft = lowercase === 'hotmail' || lowercase === 'outlook' || lowercase === 'live' || lowercase === 'msn' ||
                        lowercase.startsWith('hotmail.') || lowercase.startsWith('outlook.') || lowercase.startsWith('live.') || lowercase.startsWith('msn.') ||
                        lowercase.includes('.hotmail.') || lowercase.includes('.outlook.') || lowercase.includes('.live.') || lowercase.includes('.msn.') ||
                        /\b(hotmail|outlook|live|msn)\.[a-z]{2,}/i.test(lowercase);
                        
    if (isMicrosoft) return true;

    // 4. Apple consumer email domains (icloud, me, mac)
    const isApple = lowercase === 'icloud' || lowercase.startsWith('icloud.') || lowercase.includes('.icloud.') || 
                    lowercase === 'me.com' || lowercase.endsWith('.me.com') ||
                    lowercase === 'mac.com' || lowercase.endsWith('.mac.com') ||
                    /\bicloud\.[a-z]{2,}/i.test(lowercase);
                    
    if (isApple) return true;

    // 5. AOL consumer email domains
    const isAol = lowercase === 'aol' || lowercase.startsWith('aol.') || lowercase.includes('.aol.') ||
                  /\baol\.[a-z]{2,}/i.test(lowercase);
                  
    if (isAol) return true;

    // 6. Protonmail consumer email domains
    const isProton = lowercase === 'proton' || lowercase === 'protonmail' ||
                     lowercase.startsWith('proton.') || lowercase.startsWith('protonmail.') ||
                     lowercase.includes('.proton.') || lowercase.includes('.protonmail.') ||
                     /\b(proton|protonmail)\.[a-z]{2,}/i.test(lowercase);
                     
    if (isProton) return true;

    // 7. Zoho personal consumer email domains (zoho.com, zoho.in, zoho.eu etc)
    const isZoho = lowercase === 'zoho' || lowercase.startsWith('zoho.') || lowercase.includes('.zoho.') ||
                   /\bzoho\.[a-z]{2,}/i.test(lowercase);
                   
    if (isZoho) return true;

    // 8. Other popular international public/personal/disposable email providers
    const otherPersonalDomains = [
      'mail.com', 'email.com', 'gmx.com', 'gmx.net', 'gmx.de', 'gmx.at', 'gmx.ch',
      'web.de', 'freenet.de', 't-online.de', 'lycos.com', 'rediffmail.com', 'indiatimes.com',
      'naver.com', 'daum.net', 'hanmail.net', 'nate.com', 'yandex.com', 'yandex.ru', 'mail.ru', 
      'rambler.ru', 'fastmail.com', 'fastmail.fm', 'hushmail.com', 'hush.com', 'runbox.com',
      'tutanota.com', 'tutanota.de', 'tutamail.com', 'tuta.io', 'tuta.mail', 'comcast.net', 
      'charter.net', 'cox.net', 'verizon.net', 'att.net', 'bellsouth.net', 'earthlink.net', 
      'netzero.net', 'juno.com', 'optonline.net', 'roadrunner.com', 'shaw.ca', 'rogers.com', 
      'sympatico.ca', 'btinternet.com', 'virginmedia.com', 'ntlworld.com', 'blueyonder.co.uk', 
      'talktalk.co.uk', 'sky.com', 'orange.fr', 'sfr.fr', 'free.fr', 'laposte.net', 
      'wanadoo.fr', 'uol.com.br', 'bol.com.br', 'terra.com.br', 'ig.com.br', 'bigpond.com', 
      'optusnet.com.au', 'telstra.com', 'skynet.be', 'telenet.be', 'xs4all.nl', 'kpnmail.nl', 
      'ziggo.nl', 'libero.it', 'virgilio.it', 'alice.it', 'fastwebnet.it', 'tin.it', 'voo.be', 
      'scarlet.be', 'yopmail.com', 'mailinator.com', '10minutemail.com', 'tempmail.com'
    ];

    return otherPersonalDomains.some(personal => {
      return lowercase === personal || lowercase.endsWith('.' + personal);
    });
  };

  const checkDomain = async (domain: string) => {
    try {
      const res = await fetchWithTimeout(`https://dns.google/resolve?name=${domain}&type=MX`, {}, 4000);
      if (res.ok) {
        const data = await res.json();
        if (data.Answer && data.Answer.length > 0) return true;
        if (data.Status === 3) {
          // If Status is NXDOMAIN (3), the domain is definitely invalid
          return false;
        }
      }
    } catch (e) {
      console.warn("Primary DNS (Google) check failed or timed out, trying fallback...", e);
    }

    try {
      // Fallback to Cloudflare DNS-over-HTTPS
      const res = await fetchWithTimeout(`https://cloudflare-dns.com/dns-query?name=${domain}&type=MX`, {
        headers: { 'accept': 'application/dns-json' }
      }, 4000);
      if (res.ok) {
        const data = await res.json();
        if (data.Answer && data.Answer.length > 0) return true;
        if (data.Status === 3) {
          return false;
        }
      }
    } catch (e) {
      console.warn("Fallback DNS (Cloudflare) check failed or timed out:", e);
    }

    // Crucial safety fallback: if DNS endpoints are blocked, do not halt the user's form submission.
    console.warn("Both DNS MX lookups timed out or failed. Falling back to optimistic acceptance to prevent block.");
    return true;
  };

  const handleSendOtp = async () => {
    setFormError('');
    setOtpError('');

    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();
    const trimmedEmail = email.trim();

    // Pre-validation
    if (!trimmedName) {
      setFormError('Please enter your name.');
      return;
    }
    if (!trimmedPhone || trimmedPhone.length < 10) {
      setFormError('Please enter a valid phone number (at least 10 digits).');
      return;
    }
    if (!trimmedEmail || !trimmedEmail.includes('@')) {
      setFormError('Please enter a valid business email.');
      return;
    }

    const domain = trimmedEmail.split('@')[1].toLowerCase().trim();
    
    // Strict domain format validation
    const domainRegex = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!domainRegex.test(domain)) {
      setFormError('Please enter a valid business email with a proper domain name (e.g., name@company.com).');
      return;
    }

    // Comprehensive personal / free email domain validation
    if (isPublicEmailDomain(domain)) {
      setFormError('Personal and public email accounts (Google, Yahoo, Outlook, iCloud, Zoho, etc.) are restricted. Please enter a valid corporate / business email.');
      return;
    }

    setIsSendingOtp(true);

    const isValidDomain = await checkDomain(domain);
    if (!isValidDomain) {
      setFormError('Invalid business domain / MX records. Please enter a live business email.');
      setIsSendingOtp(false);
      return;
    }

    // Generate random 6-digit OTP code to avoid fake entries
    const num = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(num);
    setOtpInputs(['', '', '', '', '', '']);

    try {
      const db = getFirebaseDb();
      let dbWriteSucceeded = false;
      if (db) {
        // Wrap database write in a 4-second timeout to prevent blocking the OTP email function call if Firestore is unprovisioned or unreachable
        const writePromise = addDoc(collection(db, 'otp_codes'), {
          email: trimmedEmail.toLowerCase(),
          otp: num,
          createdAt: Timestamp.now(),
          expiresAt: Timestamp.fromDate(new Date(Date.now() + 5 * 60 * 1000)), // expires in 5 minutes
        });
        
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error("Firestore database write timed out")), 4000)
        );

        try {
          await Promise.race([writePromise, timeoutPromise]);
          dbWriteSucceeded = true;
          console.log("OTP successfully saved to Firestore.");
        } catch (dbErr) {
          console.warn("Firestore OTP write failed or timed out. Falling back to secure mail function & state-driven verification...", dbErr);
        }
      }

      // VITE_OTP_FUNCTION_URL webhook endpoint integration triggers if present
      const functionUrl = import.meta.env.VITE_OTP_FUNCTION_URL;
      if (functionUrl) {
        try {
          await fetchWithTimeout(functionUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: trimmedEmail, otp: num, type: 'otp' })
          }, 8000); // 8 second timeout threshold
          console.log("OTP delivery request dispatched via Cloud Function webhook successfully.");
        } catch (funcErr) {
          console.error("OTP Function trigger failed or timed out:", funcErr);
        }
      }

      setIsOtpSent(true);
      setTimer(90);

      // Focus first OTP input
      setTimeout(() => {
        inputRefs[0].current?.focus();
      }, 100);
    } catch (err) {
      console.error(err);
      setFormError('Failed to prepare OTP submission. Please try again.');
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleOtpChange = (index: number, val: string) => {
    // Only accept numeric digits
    if (val && !/^\d$/.test(val)) return;

    const newInputs = [...otpInputs];
    newInputs[index] = val;
    setOtpInputs(newInputs);

    // Auto focus next input
    if (val !== '' && index < 5) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Backspace to focus previous box
    if (e.key === 'Backspace') {
      if (otpInputs[index] === '' && index > 0) {
        const newInputs = [...otpInputs];
        newInputs[index - 1] = '';
        setOtpInputs(newInputs);
        inputRefs[index - 1].current?.focus();
      } else {
        const newInputs = [...otpInputs];
        newInputs[index] = '';
        setOtpInputs(newInputs);
      }
    }
  };

  const handleVerifySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setOtpError('');
    setFormError('');

    if (!isOtpSent) {
      setOtpError('Please click "SEND OTP" first to generate your verification code.');
      return;
    }

    const trimmedEmail = email.trim();
    if (!trimmedEmail || !trimmedEmail.includes('@')) {
      setOtpError('Please enter a valid business email.');
      return;
    }

    const domain = trimmedEmail.split('@')[1]?.toLowerCase().trim() || '';
    if (isPublicEmailDomain(domain)) {
      setOtpError('A corporate business email domain is required to submit your enquiry.');
      return;
    }

    const typedCode = otpInputs.join('');
    if (typedCode.length < 6) {
      setOtpError('Please enter the full 6-digit verification code.');
      return;
    }

    setIsVerifying(true);

    try {
      const db = getFirebaseDb();
      let isValid = false;

      if (db) {
        try {
          const q = query(collection(db, 'otp_codes'), where('email', '==', email.trim().toLowerCase()));
          const getDocsPromise = getDocs(q);
          const timeoutPromise = new Promise<never>((_, reject) => 
            setTimeout(() => reject(new Error("Firestore query timed out")), 4000)
          );
          
          const snap = await Promise.race([getDocsPromise, timeoutPromise]);
          
          snap.forEach((doc) => {
            const data = doc.data();
            const otpMatch = data.otp === typedCode;
            const expiresAtTime = data.expiresAt ? data.expiresAt.toDate().getTime() : 0;
            const isExpired = Date.now() > expiresAtTime;
            if (otpMatch && !isExpired) {
              isValid = true;
            }
          });
        } catch (dbErr) {
          console.warn("Firestore verification query timed out or failed. Checking local generatedOtp fallback state...", dbErr);
          isValid = typedCode === generatedOtp;
        }
      } else {
        // Fallback simulation mode if Firebase environment keys are inactive
        isValid = typedCode === generatedOtp;
      }

      if (!isValid) {
        setOtpError('Invalid or expired OTP code.');
        setIsVerifying(false);
        return;
      }

      // Record successful verified contact submission in Firebase inquiries collection
      if (db) {
        try {
          const inquiryPromise = addDoc(collection(db, 'inquiries'), {
            name: name.trim(),
            phone: phone.trim(),
            email: email.trim().toLowerCase(),
            service: selectedService,
            message,
            createdAt: Timestamp.now(),
          });
          const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error("Firestore inquiry write timed out")), 4000)
          );
          await Promise.race([inquiryPromise, timeoutPromise]);
          console.log("Inquiry logged to Firestore.");
        } catch (dbErr) {
          console.warn("Failed or timed out recording inquiry to Firestore. Proceeding with Webhook payload...", dbErr);
        }
      }

      // VITE_OTP_FUNCTION_URL webhooks trigger
      const functionUrl = import.meta.env.VITE_OTP_FUNCTION_URL;
      if (functionUrl) {
        try {
          const getCompany = (emailStr: string) => emailStr.split('@')[1].split('.')[0];
          await fetchWithTimeout(functionUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: name.trim(),
              phone: phone.trim(),
              email: email.trim(),
              subject: 'New Enquiry',
              message,
              company: getCompany(email.trim()),
              type: 'lead'
            })
          }, 8000); // 8 second timeout threshold
          console.log("Inquiry dispatch via Cloud Function webhook finished successfully.");
        } catch (funcErr) {
          console.error("Lead Function trigger failed or timed out:", funcErr);
        }
      }

      // Success transition
      setIsSubmitted(true);
    } catch (err) {
      console.error(err);
      setOtpError('Verification failed. Unable to verify with Firebase database.');
    } finally {
      setIsVerifying(false);
    }
  };

  // Re-enable editing or reset form
  const handleReset = () => {
    setName('');
    setPhone('');
    setEmail('');
    setSelectedService(servicesData[0].title);
    setMessage('Can you call me back as I would like to know more about your IT/ITES/BPO/KPO Services?');
    setIsOtpSent(false);
    setGeneratedOtp('');
    setOtpInputs(['', '', '', '', '', '']);
    setIsSubmitted(false);
    setTimer(0);
  };

  return (
    <div id="contact-us-container" className="relative w-full">
      
      {/* Main card matching client mockup style */}
      <div className="mx-auto max-w-sm rounded-[24px] bg-[#0a0a0c]/95 p-6.5 shadow-2xl border border-[#222222] shadow-black/80 relative overflow-hidden">
        
        {/* Upper Background Accent Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-10 bg-brand-gold/5 rounded-full blur-xl pointer-events-none" />

         {isSubmitted ? (
          /* Submission success view */
          <div className="py-12 px-2 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-brand-gold/10 border border-brand-gold/40 flex items-center justify-center mx-auto text-brand-gold">
              <CheckCircle size={36} />
            </div>
            <div className="space-y-2">
              <h3 className="font-display font-medium text-white text-xl uppercase tracking-wider">
                Enquiry Received
              </h3>
              <p className="text-base text-neutral-400 font-sans leading-relaxed">
                Thank you, <span className="text-white font-medium">{name}</span>! Your contact verification was successful and your proposal query regarding <span className="text-brand-gold font-medium">{selectedService}</span> is logged.
              </p>
            </div>
            <div className="py-4 px-4 rounded-xl bg-black border border-neutral-800 text-[11px] text-gray-400 font-mono space-y-1 max-w-[280px] mx-auto text-left">
              <div className="text-brand-gold uppercase font-bold text-[9px] tracking-widest">SUBMISSION DELEGATED:</div>
              <div>• Service: {selectedService}</div>
              <div>• Phone: {phone}</div>
              <div>• Email: {email}</div>
            </div>
            <div className="flex flex-col gap-2.5 items-center justify-center pt-2">
              <button
                onClick={handleReset}
                className="w-full max-w-[220px] py-2 rounded-full font-mono text-xs text-brand-gold hover:text-white border border-brand-gold/20 hover:border-brand-gold transition-colors cursor-pointer"
              >
                Submit Another Enquiry
              </button>
              {onExit && (
                <button
                  type="button"
                  onClick={onExit}
                  className="text-[11px] font-sans text-neutral-400 hover:text-brand-gold underline transition-colors cursor-pointer"
                >
                  Click here to exit
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Interactive verification form matching precisely */
          <form onSubmit={handleVerifySubmit} className="space-y-4">
            
            {/* Header Contact Us Capsule Badge */}
            <div className="flex justify-center -mt-2">
              <div className="px-10 py-3 rounded-full bg-brand-gold text-black border border-brand-gold-hover/40 text-center tracking-widest shadow-md">
                <span className="font-display font-black text-black text-base md:text-lg block tracking-wider uppercase">
                  CONTACT US
                </span>
              </div>
            </div>

            {/* Sub description inside form box */}
            <div className="text-center pb-2 pt-1">
              <p className="text-[10px] text-neutral-400 uppercase font-mono tracking-widest flex items-center justify-center gap-1.5">
                <Lock size={10} className="text-brand-gold" /> Secured Verification Handshake
              </p>
            </div>

            {/* Error notifications */}
            {formError && (
              <div className="p-3 text-xs rounded-xl bg-red-950/40 border border-red-500/20 text-red-300 font-sans">
                {formError}
              </div>
            )}

            {/* INPUTS SEGMENT */}
            <div className="space-y-3">
              {/* Name box */}
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className="w-full px-4 py-3 rounded-xl bg-black border border-neutral-850 focus:border-brand-gold focus:outline-hidden text-base text-white placeholder-neutral-600 font-sans transition-colors"
              />

              {/* Phone box */}
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone"
                className="w-full px-4 py-3 rounded-xl bg-black border border-neutral-850 focus:border-brand-gold focus:outline-hidden text-base text-white placeholder-neutral-600 font-sans transition-colors"
              />

              {/* Business Email box */}
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Business Email"
                className="w-full px-4 py-3 rounded-xl bg-black border border-neutral-850 focus:border-brand-gold focus:outline-hidden text-base text-white placeholder-neutral-600 font-sans transition-colors"
              />

              {/* Dropdown service SELECT - matching user instructions */}
              <div className="relative">
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full px-3.5 py-3 rounded-xl bg-black border border-neutral-850 focus:border-brand-gold focus:outline-hidden text-base text-white font-sans transition-all cursor-pointer appearance-none"
                >
                  {servicesData.map((svc) => (
                    <option key={svc.id} value={svc.title} className="bg-[#0a0a0c] text-white py-1">
                      {svc.title}
                    </option>
                  ))}
                  <option value="General Partnerships" className="bg-[#0a0a0c] text-white py-1">General Opportunities</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-neutral-400">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                  </svg>
                </div>
              </div>

              {/* Message text area */}
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enquiry / Message"
                className="w-full px-4 py-3 rounded-xl bg-black border border-neutral-850 focus:border-brand-gold focus:outline-hidden text-base text-white placeholder-neutral-600 font-sans transition-colors resize-none"
              />
            </div>

            {/* SEND OTP BUTTON */}
            <button
              type="button"
              id="form-send-otp-btn"
              onClick={handleSendOtp}
              disabled={isSendingOtp || timer > 0}
              className={`w-full py-3.5 rounded-full font-display font-bold text-sm tracking-wider uppercase bg-[#16161a] hover:bg-neutral-800 text-white border border-neutral-800 shadow-md active:scale-97 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <Send size={14} className="text-brand-gold" />
              {isSendingOtp ? 'Sending...' : timer > 0 ? `Resend in ${timer}s` : 'SEND OTP'}
            </button>

            {/* Digit codes line layout matching screenshot */}
            <div className="space-y-2 pt-2">
              <label className="block text-center text-[10px] uppercase tracking-widest text-neutral-400 font-mono">
                Verification Code
              </label>
              
              <div className="flex justify-between gap-1.5 px-1">
                {otpInputs.map((digit, index) => (
                  <input
                    id={`otp-digit-${index}`}
                    key={index}
                    ref={inputRefs[index]}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    disabled={!isOtpSent}
                    className="w-10 h-11 text-center bg-black disabled:opacity-40 border border-neutral-850 focus:border-brand-gold text-lg font-bold text-white rounded-lg focus:outline-hidden focus:ring-0 transition-colors"
                  />
                ))}
              </div>
              
              {otpError && (
                <div className="text-center text-[11px] text-red-400 font-sans">
                  {otpError}
                </div>
              )}
            </div>

            {/* VERIFY & SUBMIT BUTTON */}
            <button
              type="submit"
              id="form-verify-submit-btn"
              disabled={!isOtpSent || isVerifying}
              className="w-full py-3.5 rounded-full font-display font-bold text-sm tracking-widest uppercase bg-brand-gold hover:bg-brand-gold-hover disabled:opacity-50 disabled:cursor-not-allowed text-black border border-brand-gold-hover/20 shadow-md active:scale-97 transition-all cursor-pointer flex items-center justify-center gap-1"
            >
              {isVerifying ? 'VERIFYING...' : 'VERIFY & SUBMIT'}
            </button>

          </form>
        )}

      </div>
    </div>
  );
}
