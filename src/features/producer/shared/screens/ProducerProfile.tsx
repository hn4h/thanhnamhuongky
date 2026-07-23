import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  User,
  Mail,
  Phone,
  Building2,
  MapPin,
  FileText,
  ShieldCheck,
  PenLine,
  Globe,
  Bell,
  Fingerprint,
  Moon,
  ChevronRight,
  LogOut
} from 'lucide-react'
import { AppFrame } from '../../../../shared/components/layout/AppFrame'
import { ProducerNav } from '../components/ProducerNav'
import type { ProducerProductModule } from '../types'

type ProducerProfileProps = {
  product: ProducerProductModule
}

type Language = 'vi' | 'en'

const translations = {
  vi: {
    title: 'Hồ Sơ',
    editProfile: 'Chỉnh sửa hồ sơ',
    role: 'Nhà Sản Xuất',
    verified: 'Đã xác minh',
    memberSince: 'Thành viên từ',
    batches: 'Mẻ bánh',
    ovens: 'Lồng hấp/nướng',
    years: 'Kinh nghiệm',
    personalInfo: 'Thông tin cá nhân',
    fullName: 'Họ và tên',
    email: 'Email',
    phone: 'Số điện thoại',
    facility: 'Cơ sở sản xuất',
    location: 'Địa chỉ',
    license: 'Giấy phép SX',
    settings: 'Cài đặt',
    languageLabel: 'Ngôn ngữ',
    notifications: 'Thông báo',
    biometric: 'Xác thực sinh trắc',
    darkMode: 'Chế độ tối',
    app: 'Ứng dụng',
    version: 'Phiên bản',
    terms: 'Điều khoản sử dụng',
    privacy: 'Chính sách bảo mật',
    support: 'Hỗ trợ kỹ thuật',
    logout: 'Đăng xuất'
  },
  en: {
    title: 'Profile',
    editProfile: 'Edit Profile',
    role: 'Producer',
    verified: 'Verified',
    memberSince: 'Member since',
    batches: 'Batches',
    ovens: 'Steamers/Ovens',
    years: 'Years exp.',
    personalInfo: 'Personal Info',
    fullName: 'Full Name',
    email: 'Email',
    phone: 'Phone',
    facility: 'Facility',
    location: 'Location',
    license: 'License No.',
    settings: 'Settings',
    languageLabel: 'Language',
    notifications: 'Notifications',
    biometric: 'Biometric Auth',
    darkMode: 'Dark Mode',
    app: 'App',
    version: 'Version',
    terms: 'Terms of Use',
    privacy: 'Privacy Policy',
    support: 'Technical Support',
    logout: 'Log Out'
  }
}

export function ProducerProfile({ product }: ProducerProfileProps) {
  const navigate = useNavigate()
  const [lang, setLang] = useState<Language>('vi')

  // Interactive States
  const [notifyActive, setNotifyActive] = useState(true)
  const [biometricActive, setBiometricActive] = useState(true)
  const [darkModeActive, setDarkModeActive] = useState(false)

  const t = translations[lang]

  // Dynamic Producer Data based on product key mapped for Thanh Nam Huong Ky
  const getProducerData = (key: string) => {
    switch (key) {
      case 'banh-gai':
        return {
          fullName: 'Trần Thị Thanh Huyền',
          email: 'huyentrantt35@thanhnamhuongky.com.vn',
          phone: '0854386316',
          facility: '94 Trần Hưng Đạo, Phường Nam Định, Tỉnh Ninh Bình',
          location: '94 Trần Hưng Đạo, Phường Nam Định, Tỉnh Ninh Bình',
          license: 'GPSX-TNHK-2021-0089',
          avatar: 'TH',
          memberYear: '2021',
          batches: 38,
          ovens: 8,
          years: '15 năm'
        }
      case 'banh-xiu-pao':
        return {
          fullName: 'Đỗ Thu Thủy',
          email: 'Thuydot43@thanhnamhuongky.com.vn',
          phone: '0947469722',
          facility: '28 Nguyễn Trãi - Phường Nam Định - Tỉnh Ninh Bình',
          location: '28 Nguyễn Trãi - Phường Nam Định - Tỉnh Ninh Bình',
          license: 'GPSX-TNHK-2021-0090',
          avatar: 'TT',
          memberYear: '2021',
          batches: 42,
          ovens: 6,
          years: '12 năm'
        }
      case 'keo-xiu-chau':
      case 'doi':
      default:
        return {
          fullName: 'Ngô Thanh Lan',
          email: 'Lanngot21@thanhnamhuongky.com.vn',
          phone: '0947007557',
          facility: '596 Điện Biên - Phường Nam Định - Tỉnh Ninh Bình',
          location: '596 Điện Biên - Phường Nam Định - Tỉnh Ninh Bình',
          license: 'GPSX-TNHK-2021-0091',
          avatar: 'TL',
          memberYear: '2021',
          batches: 30,
          ovens: 4,
          years: '10 năm'
        }
    }
  }

  const producerData = getProducerData(product.key)

  const personalInfoItems = [
    { icon: User, label: t.fullName, value: producerData.fullName },
    { icon: Mail, label: t.email, value: producerData.email },
    { icon: Phone, label: t.phone, value: producerData.phone },
    { icon: Building2, label: t.facility, value: producerData.facility },
    { icon: MapPin, label: t.location, value: producerData.location },
    { icon: FileText, label: t.license, value: producerData.license }
  ]

  // Toggle Switch Component
  const ToggleSwitch = ({ active, onToggle }: { active: boolean; onToggle: () => void }) => (
    <button
      type="button"
      onClick={onToggle}
      className="relative h-6 w-11 shrink-0 rounded-full transition-colors duration-300 focus:outline-none"
      style={{
        background: active ? 'linear-gradient(90deg, #3A0611, #F1C932)' : 'rgba(114,26,24,0.2)',
      }}
    >
      <div
        className="absolute top-1 h-4 w-4 rounded-full bg-white shadow-md transition-transform duration-200 ease-in-out"
        style={{
          transform: active ? 'translateX(22px)' : 'translateX(4px)',
        }}
      />
    </button>
  )

  return (
    <AppFrame contentClassName="p-0">
      <div className="min-h-screen overflow-x-hidden bg-[#F8EFE2] pb-24 text-[#150807]">

        {/* Profile Premium Header */}
        <header
          className="relative overflow-hidden px-5 pb-7 pt-14 text-white bg-gradient-to-l from-[#77452f] to-[#1c1009]"
        >
          {/* Glowing Accents */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.13),transparent_28%)] pointer-events-none" />
          <div className="absolute -right-8 -top-8 h-44 w-44 rounded-full bg-[#F1C932]/10 blur-xl pointer-events-none" />
          <div className="absolute -left-6 -bottom-10 h-36 w-36 rounded-full bg-[#F1C932]/12 blur-lg pointer-events-none" />

          <div className="relative flex items-center justify-between mb-6">
            <span className="text-lg font-bold tracking-wide font-sans">{t.title}</span>
            <button
              type="button"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F1C932]/10 border border-[#F1C932]/30 transition-all duration-300 hover:bg-[#F1C932]/20 hover:scale-105 active:scale-95"
            >
              <PenLine size={13} className="text-[#F1C932]" />
              <span className="text-xs font-semibold text-[#F1C932]">{t.editProfile}</span>
            </button>
          </div>

          {/* User Details */}
          <div className="relative flex items-center gap-4">
            <div className="relative">
              <div
                className="flex items-center justify-center w-[76px] h-[76px] rounded-full text-white font-bold text-2xl border border-[#F1C932]/40 shadow-lg transition-transform duration-500 hover:rotate-[360deg]"
                style={{
                  borderWidth: '3px',
                  background: 'linear-gradient(135deg, #3A0611 0%, #F1C932 100%)',
                }}
              >
                {producerData.avatar}
              </div>
              <div className="absolute bottom-0.5 right-0.5 h-[18px] w-[18px] rounded-full bg-[#22C55E] border border-[#1A0A00]" style={{ borderWidth: '2px' }} />
            </div>

            <div className="flex-1">
              <h1 className="text-[19px] font-bold tracking-wide text-white leading-tight">{producerData.fullName}</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#F1C932]/20 text-[#F1C932] border border-[#F1C932]/30">
                  {t.role}
                </span>
              </div>
              <div className="flex items-center gap-1 mt-2 text-[#4A9F57]">
                <ShieldCheck size={13} className="shrink-0" />
                <span className="text-xs font-semibold">{t.verified}</span>
                <span className="text-xs text-[#C9AAA5] ml-1">
                  · {t.memberSince} {producerData.memberYear}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Stats Section */}
        <section className="px-4 -mt-4 mb-4 relative z-10">
          <div className="grid grid-cols-3 gap-1.5 p-3.5 rounded-2xl bg-white shadow-[0_12px_28px_rgba(57,28,12,0.08)] border border-[#EFE4DC] transition-all duration-300 hover:scale-[1.01]">

            {/* Column 1 */}
            <div className="flex flex-col items-center py-1.5 text-center">
              <span className="text-[20px] font-extrabold text-[#3A0611] leading-none">{producerData.batches}</span>
              <span className="text-[10px] font-bold text-[#806A5B] uppercase tracking-wider mt-1.5 leading-tight">{t.batches}</span>
            </div>

            {/* Column 2 - Divider left */}
            <div className="flex flex-col items-center py-1.5 text-center border-l border-[#EFE4DC]">
              <span className="text-[20px] font-extrabold text-[#3A0611] leading-none">{producerData.ovens}</span>
              <span className="text-[10px] font-bold text-[#806A5B] uppercase tracking-wider mt-1.5 leading-tight">
                {product.key === 'banh-xiu-pao' ? 'Lò nướng' : t.ovens}
              </span>
            </div>

            {/* Column 3 - Divider left */}
            <div className="flex flex-col items-center py-1.5 text-center border-l border-[#EFE4DC]">
              <span className="text-[20px] font-extrabold text-[#3A0611] leading-none">{producerData.years}</span>
              <span className="text-[10px] font-bold text-[#806A5B] uppercase tracking-wider mt-1.5 leading-tight">{t.years}</span>
            </div>

          </div>
        </section>

        {/* Personal Info Section */}
        <section className="px-4 mb-4">
          <div className="mb-2 px-1 text-[11px] font-bold uppercase tracking-wider text-[#806A5B]">{t.personalInfo}</div>
          <div className="rounded-2xl bg-white shadow-[0_12px_28px_rgba(57,28,12,0.08)] border border-[#EFE4DC] overflow-hidden divide-y divide-[#EFE4DC] transition-all duration-300 hover:scale-[1.01]">
            {personalInfoItems.map((item, idx) => {
              const Icon = item.icon
              return (
                <div key={idx} className="flex items-start gap-3.5 px-4 py-3.5 transition-colors duration-200 hover:bg-[#FDF9F5]">
                  <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-[#3A0611]/8 shrink-0 mt-0.5">
                    <Icon size={15} className="text-[#3A0611]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-bold text-[#806A5B] uppercase tracking-wider leading-none">{item.label}</p>
                    <p className="text-sm font-extrabold text-[#150807] mt-1 truncate">{item.value}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Settings Section */}
        <section className="px-4 mb-4">
          <div className="mb-2 px-1 text-[11px] font-bold uppercase tracking-wider text-[#806A5B]">{t.settings}</div>
          <div className="rounded-2xl bg-white shadow-[0_12px_28px_rgba(57,28,12,0.08)] border border-[#EFE4DC] overflow-hidden divide-y divide-[#EFE4DC] transition-all duration-300 hover:scale-[1.01]">

            {/* Language Selection Toggle */}
            <div className="flex flex-col gap-2.5 px-4 py-3.5 transition-colors duration-200 hover:bg-[#FDF9F5]">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-[#3A0611]/8 shrink-0">
                  <Globe size={15} className="text-[#3A0611]" />
                </div>
                <span className="text-sm font-extrabold text-[#150807]">{t.languageLabel}</span>
              </div>

              <div className="flex gap-2 pl-[44px]">
                {/* Tiếng Việt Button */}
                <button
                  type="button"
                  onClick={() => setLang('vi')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-300 border hover:scale-105 active:scale-95"
                  style={{
                    background: lang === 'vi' ? 'linear-gradient(135deg, #3A0611 0%, #721A18 100%)' : 'rgba(114,26,24,0.06)',
                    borderColor: lang === 'vi' ? 'transparent' : 'rgba(114,26,24,0.2)',
                    color: lang === 'vi' ? '#FFF' : '#806A5B'
                  }}
                >
                  <span>🇻🇳</span>
                  <span>Tiếng Việt</span>
                </button>

                {/* English Button */}
                <button
                  type="button"
                  onClick={() => setLang('en')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-300 border hover:scale-105 active:scale-95"
                  style={{
                    background: lang === 'en' ? 'linear-gradient(135deg, #3A0611 0%, #721A18 100%)' : 'rgba(114,26,24,0.06)',
                    borderColor: lang === 'en' ? 'transparent' : 'rgba(114,26,24,0.2)',
                    color: lang === 'en' ? '#FFF' : '#806A5B'
                  }}
                >
                  <span>🇬🇧</span>
                  <span>English</span>
                </button>
              </div>
            </div>

            {/* Notification Switch */}
            <div className="flex items-center justify-between px-4 py-3.5 transition-colors duration-200 hover:bg-[#FDF9F5]">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-[#FFF6E7] shrink-0">
                  <Bell size={15} className="text-[#C78116]" />
                </div>
                <span className="text-sm font-extrabold text-[#150807]">{t.notifications}</span>
              </div>
              <ToggleSwitch active={notifyActive} onToggle={() => setNotifyActive(!notifyActive)} />
            </div>

            {/* Biometric Switch */}
            <div className="flex items-center justify-between px-4 py-3.5 transition-colors duration-200 hover:bg-[#FDF9F5]">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-[#EDF9F0] shrink-0">
                  <Fingerprint size={15} className="text-[#4A9F57]" />
                </div>
                <span className="text-sm font-extrabold text-[#150807]">{t.biometric}</span>
              </div>
              <ToggleSwitch active={biometricActive} onToggle={() => setBiometricActive(!biometricActive)} />
            </div>

            {/* Dark Mode Switch */}
            <div className="flex items-center justify-between px-4 py-3.5 transition-colors duration-200 hover:bg-[#FDF9F5]">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-[#F7F0EA] shrink-0">
                  <Moon size={15} className="text-[#4A2D1E]" />
                </div>
                <span className="text-sm font-extrabold text-[#150807]">{t.darkMode}</span>
              </div>
              <ToggleSwitch active={darkModeActive} onToggle={() => setDarkModeActive(!darkModeActive)} />
            </div>

          </div>
        </section>

        {/* App Info & Links Section */}
        <section className="px-4 mb-4">
          <div className="mb-2 px-1 text-[11px] font-bold uppercase tracking-wider text-[#806A5B]">{t.app}</div>
          <div className="rounded-2xl bg-white shadow-[0_12px_28px_rgba(57,28,12,0.08)] border border-[#EFE4DC] overflow-hidden divide-y divide-[#EFE4DC] transition-all duration-300 hover:scale-[1.01]">

            {/* Version */}
            <div className="flex items-center justify-between px-4 py-3.5 transition-colors duration-200 hover:bg-[#FDF9F5]">
              <span className="text-sm font-extrabold text-[#150807]">{t.version}</span>
              <span className="text-xs font-bold text-[#806A5B]">v2.4.1</span>
            </div>

            {/* Terms of Use */}
            <button
              type="button"
              onClick={() => navigate(`/producer/${product.key}/terms`)}
              className="w-full flex items-center justify-between px-4 py-3.5 text-left focus:outline-none transition-colors duration-200 hover:bg-[#FDF9F5]"
            >
              <span className="text-sm font-extrabold text-[#150807]">{t.terms}</span>
              <ChevronRight size={16} className="text-[#806A5B]" />
            </button>

            {/* Privacy Policy */}
            <button
              type="button"
              onClick={() => navigate(`/producer/${product.key}/privacy`)}
              className="w-full flex items-center justify-between px-4 py-3.5 text-left focus:outline-none transition-colors duration-200 hover:bg-[#FDF9F5]"
            >
              <span className="text-sm font-extrabold text-[#150807]">{t.privacy}</span>
              <ChevronRight size={16} className="text-[#806A5B]" />
            </button>

            {/* Tech Support */}
            <button
              type="button"
              onClick={() => navigate(`/producer/${product.key}/support`)}
              className="w-full flex items-center justify-between px-4 py-3.5 text-left focus:outline-none transition-colors duration-200 hover:bg-[#FDF9F5]"
            >
              <span className="text-sm font-extrabold text-[#150807]">{t.support}</span>
              <ChevronRight size={16} className="text-[#806A5B]" />
            </button>

          </div>
        </section>

        {/* Log Out Button */}
        <section className="px-4 mt-6">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-[#FCE8E3] border border-[#B23B2F]/20 transition-all duration-300 hover:bg-[#FCE8E3]/80 hover:scale-[1.01] active:scale-[0.99]"
          >
            <LogOut size={16} className="text-[#B23B2F]" />
            <span className="text-sm font-extrabold text-[#B23B2F]">{t.logout}</span>
          </button>
        </section>

        {/* Bottom Nav Bar */}
        <ProducerNav product={product} />

      </div>
    </AppFrame>
  )
}
