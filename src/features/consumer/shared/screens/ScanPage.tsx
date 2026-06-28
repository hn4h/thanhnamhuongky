import { useState, useRef, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { QrCode, Camera, AlertCircle, Sparkles, Check, ArrowLeft } from 'lucide-react'
import { AppFrame } from '../../../../shared/components/layout/AppFrame'
import { findConsumerProduct, consumerProducts } from '../productRegistry'

export function ScanPage() {
  const { productKey } = useParams<{ productKey: string }>()
  const navigate = useNavigate()
  const currentProduct = findConsumerProduct(productKey)

  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null)
  const [cameraError, setCameraError] = useState<string>('')
  const [isScanning, setIsScanning] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  // Request camera permission
  const startCamera = async () => {
    setCameraError('')
    try {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      })
      
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
      setHasCameraPermission(true)
      setIsScanning(true)
    } catch (err: any) {
      console.error('Lỗi truy cập camera:', err)
      setHasCameraPermission(false)
      setCameraError('Không thể mở camera. Hãy đảm bảo bạn đã cấp quyền truy cập camera trong trình duyệt.')
    }
  }

  // Cleanup camera stream
  useEffect(() => {
    startCamera()
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }
    }
  }, [productKey])

  // Simulate scanning code
  const simulateScan = (selectedProductKey: string) => {
    setIsScanning(false)
    const product = findConsumerProduct(selectedProductKey)
    if (!product) return

    // Dynamic mock serial code
    const code = product.product.code
    
    // Redirect to authentication result with code
    navigate(`/consumer/${selectedProductKey}/auth-result?code=${code}`)
  }

  return (
    <AppFrame
      title="Quét QR Đặc Sản"
      subtitle="Đang quét mã tem chính hãng Thành Nam Hương Ký."
    >
      <div className="px-4 py-6">
        <div className="mb-4 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-lacquer-400 hover:text-lacquer-600 transition"
          >
            <ArrowLeft size={14} />
            <span>Chọn vai trò</span>
          </Link>
        </div>

        {/* QR Scanner Container */}
        <div className="relative overflow-hidden rounded-2xl border border-gold bg-[#140b07] shadow-lacquer-lg">
          
          {/* Laser Scanner animation line overlay */}
          {isScanning && (
            <div className="absolute left-0 right-0 top-0 z-20 h-[3px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-85 shadow-[0_0_12px_#C0965A] animate-[scannerLine_2.5s_ease-in-out_infinite]" />
          )}

          {/* Gold corners to overlay scanner */}
          <div className="absolute left-4 top-4 z-20 h-6 w-6 border-l-[3px] border-t-[3px] border-gold rounded-tl-md" />
          <div className="absolute right-4 top-4 z-20 h-6 w-6 border-r-[3px] border-t-[3px] border-gold rounded-tr-md" />
          <div className="absolute left-4 bottom-4 z-20 h-6 w-6 border-l-[3px] border-b-[3px] border-gold rounded-bl-md" />
          <div className="absolute right-4 bottom-4 z-20 h-6 w-6 border-r-[3px] border-b-[3px] border-gold rounded-br-md" />

          {/* Camera feed or fallbacks */}
          <div className="relative flex aspect-square w-full items-center justify-center text-center">
            {hasCameraPermission ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="p-6 text-parchment-400">
                <QrCode size={80} strokeWidth={1} className="mx-auto text-gold/60 mb-4 animate-pulse" />
                {cameraError ? (
                  <p className="text-xs leading-relaxed text-red-400">{cameraError}</p>
                ) : (
                  <p className="text-xs leading-relaxed">Đang khởi động camera...</p>
                )}
                <button
                  onClick={startCamera}
                  className="mt-4 rounded-xl border border-gold-300 bg-gold/10 px-4 py-2 text-xs font-semibold text-gold transition hover:bg-gold/20"
                >
                  Thử lại Camera
                </button>
              </div>
            )}

            {/* Overlaid scanning target box */}
            {isScanning && (
              <div className="absolute inset-0 z-10 m-auto h-[70%] w-[70%] rounded-xl border-2 border-dashed border-gold-300/40 bg-white/5 pointer-events-none" />
            )}
          </div>
        </div>

        {/* Scan instruction info */}
        <p className="mt-4 text-center text-xs leading-relaxed text-lacquer-500 px-4">
          Căn chỉnh tem mã QR nằm giữa khung quét. Hệ thống sẽ tự động quét và giải mã.
        </p>

        {/* Test Simulator Section */}
        <section className="mt-8 rounded-xl border border-gold-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles size={16} className="text-gold" />
            <h3 className="font-bold text-sm text-lacquer-900">Bypass / Giả lập mã quét</h3>
          </div>
          
          <p className="text-xs text-lacquer-400 mb-4">
            Nhấn vào nút tương ứng bên dưới để giả lập quét thành công thẻ nhãn thật của từng sản phẩm.
          </p>

          <div className="grid gap-2">
            {consumerProducts.map((p) => {
              const isCurrent = p.key === productKey
              return (
                <button
                  key={p.key}
                  onClick={() => simulateScan(p.key)}
                  className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left transition active:scale-[0.98] ${
                    isCurrent
                      ? 'border-gold bg-gold-50 text-gold-900 font-semibold shadow-sm'
                      : 'border-gold-100 bg-parchment-50/40 text-lacquer-700 hover:bg-gold-50/30'
                  }`}
                >
                  <div>
                    <span className="block text-sm text-lacquer-950 font-bold">
                      {p.product.name}
                    </span>
                  </div>
                  {isCurrent ? (
                    <Check size={18} className="text-gold-700" />
                  ) : (
                    <span className="h-2 w-2 rounded-full bg-lacquer-300" />
                  )}
                </button>
              )
            })}
          </div>
        </section>
      </div>
    </AppFrame>
  )
}
