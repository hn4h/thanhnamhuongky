import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowRight, ChevronLeft, ChevronRight, Landmark, BookOpen, Quote } from 'lucide-react'
import { findConsumerProduct } from '../productRegistry'
import { ConsumerShell } from '../components/ConsumerShell'

export function HeritagePage() {
  const { productKey } = useParams<{ productKey: string }>()
  const productData = findConsumerProduct(productKey)
  const [currentSlide, setCurrentSlide] = useState(0)

  if (!productData) {
    return <div className="p-6 text-center text-red-500">Sản phẩm không khả dụng.</div>
  }

  const { heritage } = productData

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heritage.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heritage.length) % heritage.length)
  }

  const activeChapter = heritage[currentSlide]

  return (
    <ConsumerShell activeTab="heritage">
      <section className="space-y-6">
        
        {/* Story Slide Deck */}
        {activeChapter ? (
          <div className="relative overflow-hidden rounded-2xl border border-gold-200 bg-white p-6 shadow-sm hover:shadow-md transition duration-300 animate-fadeIn">
            
            {/* Story Icon & Chapter label */}
            <div className="flex items-center gap-2 border-b border-gold-100/50 pb-3 mb-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold-50 text-gold-700">
                <Landmark size={16} />
              </span>
              <span className="text-[10px] font-bold text-gold-700 uppercase tracking-widest">
                Chương {currentSlide + 1} / {heritage.length}
              </span>
            </div>

            {/* Simulated Ornamental Illustration Placeholder (Wow factor) */}
            <div className="relative mb-5 flex aspect-video w-full items-center justify-center rounded-xl bg-gradient-to-br from-[#4A2D1E] to-[#7A3A18] text-gold p-4 overflow-hidden border border-gold-300/30">
              {/* Ornate patterns */}
              <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "url('/images/texture-pattern.png')", backgroundSize: '80px' }} />
              
              <div className="text-center z-10">
                <BookOpen size={42} className="mx-auto text-gold mb-2 animate-bounce" />
                <p className="font-serif italic text-xs text-parchment-200">
                  Ký Ức Thành Nam
                </p>
              </div>
            </div>

            {/* Narrative Content */}
            <div className="space-y-3.5">
              <h3 className="text-lg font-serif font-bold text-lacquer-950 leading-snug">
                {activeChapter.title}
              </h3>
              <div className="relative pl-6">
                <Quote size={16} className="absolute left-0 top-1 text-gold-400 rotate-180" />
                <p className="text-xs leading-relaxed text-lacquer-600 italic">
                  {activeChapter.story}
                </p>
              </div>
            </div>

            {/* Slider Navigation controls */}
            {heritage.length > 1 && (
              <div className="mt-8 flex items-center justify-between border-t border-gold-100/30 pt-4">
                <button
                  onClick={prevSlide}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-gold-200 bg-parchment-50 text-lacquer hover:bg-gold-50 transition active:scale-90"
                >
                  <ChevronLeft size={18} />
                </button>
                
                {/* Paginate Dots */}
                <div className="flex gap-1.5">
                  {heritage.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentSlide(i)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        i === currentSlide ? 'w-5 bg-lacquer' : 'w-2 bg-lacquer-200'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextSlide}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-gold-200 bg-parchment-50 text-lacquer hover:bg-gold-50 transition active:scale-90"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}

          </div>
        ) : (
          <div className="p-6 text-center text-lacquer-400 border border-dashed border-gold-200 rounded-2xl bg-white/40">
            Đang biên soạn câu chuyện di sản cho đặc sản này.
          </div>
        )}

        {/* Dynamic CTA */}
        <div className="pt-2">
          <Link
            to={`/consumer/${productKey}/usage-guide`}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-lacquer-800 to-lacquer-900 py-4 font-bold text-parchment shadow-lacquer-lg hover:shadow-xl active:scale-[0.98] transition-all"
          >
            <span>Xem Hướng dẫn & Dùng vị</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </ConsumerShell>
  )
}
