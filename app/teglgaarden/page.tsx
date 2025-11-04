'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Play, Image as ImageIcon, Megaphone, CheckCircle2, Home, X, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Calendar, ExternalLink } from 'lucide-react'

export default function TeglgaardenPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [openBoliger, setOpenBoliger] = useState<number[]>([])
  const [openAnnoncer, setOpenAnnoncer] = useState<number[]>([])
  const [playingVideo, setPlayingVideo] = useState<string | null>(null)
  const [videoThumbnails, setVideoThumbnails] = useState<{ [key: string]: string }>({})
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const router = useRouter()

  const generateThumbnail = (videoPath: string, videoElement: HTMLVideoElement) => {
    if (videoThumbnails[videoPath]) return
    
    videoElement.addEventListener('loadedmetadata', () => {
      videoElement.currentTime = 0.1
    })
    
    videoElement.addEventListener('seeked', () => {
      const canvas = document.createElement('canvas')
      canvas.width = videoElement.videoWidth
      canvas.height = videoElement.videoHeight
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height)
        const thumbnailUrl = canvas.toDataURL('image/jpeg')
        setVideoThumbnails(prev => ({ ...prev, [videoPath]: thumbnailUrl }))
      }
    })
  }

  const toggleBolig = (index: number) => {
    setOpenBoliger(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  const toggleAnnonce = (index: number) => {
    setOpenAnnoncer(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  const handleVideoIndexChange = (newIndex: number) => {
    // Ensure we don't go beyond bounds when showing multiple items
    // Mobile shows 2, desktop shows 3
    const itemsPerView = 2
    const maxIndex = Math.max(0, videoer.length - itemsPerView)
    const clampedIndex = Math.min(newIndex, maxIndex)
    setCurrentVideoIndex(clampedIndex)
    setPlayingVideo(null) // Stop playing video when changing
  }
  
  const handleNextVideo = () => {
    const itemsPerView = 2
    const maxIndex = Math.max(0, videoer.length - itemsPerView)
    if (currentVideoIndex >= maxIndex) {
      handleVideoIndexChange(0)
    } else {
      handleVideoIndexChange(currentVideoIndex + 1)
    }
  }
  
  const handlePrevVideo = () => {
    const itemsPerView = 2
    const maxIndex = Math.max(0, videoer.length - itemsPerView)
    if (currentVideoIndex === 0) {
      handleVideoIndexChange(maxIndex)
    } else {
      handleVideoIndexChange(currentVideoIndex - 1)
    }
  }

  // Array of videoer - add video paths here
  const videoer: string[] = [
    '/teglgaarden/videoer/9.2.4.MOV',
    '/teglgaarden/videoer/Udeområde.MOV',
    '/teglgaarden/videoer/Stigsborg full 9x16.mp4',
    '/teglgaarden/videoer/Stigsborg kort 2 9x16.mp4',
    '/teglgaarden/videoer/Stigsborg kort 9x16.mp4',
    '/teglgaarden/videoer/TG Højformat.mp4',
  ]

  // Array of annoncer - add announcements here
  const annoncer = [
    {
      titel: 'STORT ÅBENT HUS PÅ TEGLGAARDEN',
      dato: '09-11-2025 & 16-11-2025',
      tekst: `Hej alle! 🌿

Vi er simpelthen nødt til at slå et kæmpe slag for et helt fantastisk byggeri, som A. Enggaard A/S står bag. - 01.12.2025 står det HELE klar til indflytning.
Vi vil derfor gerne invitere til et større åbent hus både 09-11-25 og 16-11-25. Vi får lidt forsyninger fra Surdejsbageren.

MEN nu er tiden altså kommet, hvor vi kan præsentere det helt særlige udeområde – hjertet og samlingspunktet for fællesskabet i Teglgaarden på Stigsborg.

Her har A. Enggaard A/S virkelig formået at skabe meget mere end bare boliger – det er en levende fortolkning af, hvad byliv kan være, når arkitektur, natur og fællesskab går hånd i hånd. 🌞

🌿 Om rammerne: I Teglgaarden er der skabt et miljø, hvor naboskabet får plads til at blomstre:

* Fælleshuset er hjertet i området – altid åbent for en kop kaffe og hyggesnak eller til kreative fællesaktiviteter.

Det er opdelt i tre sammenhængende huse: ét orangeri omgivet af grønne planter, et stort fælleskøkken med borde og stole – perfekt til fællesspisning, og sidst men ikke mindst, opholdsrummet - der hvor historier fortælles, kaffekopperne skåles og der hvor fællesskabet dyrkes.

* Gårdhaven udenfor inviterer til udeliv – med hyggelige kroge, bord- og bænkesæt, plads til børn og leg og overdækket cykelparkering.

* Arkitekturen og faciliteterne er designet med tanke på fællesskab og kvalitet: steder til fællesspisning, kreative rum, grønne områder, terrasser og mere.

🧑‍🤝‍🧑 Fællesskab & aktiviteter: Her handler det om at blive en del af noget – ikke bare bo et sted.

* Som beboer har du mulighed for selv at komme med idéer til aktiviteter – og vi har en dedikeret bylivskoordinator, som hjælper med at sætte initiativer i gang og holde fællesskabet i live.

* Alt, hvad der sker, kan du følge via appen "Min Bydel" – så du er altid opdateret på, hvad der foregår og kan deltage, når det passer.

* Boligerne ligger i et levende miljø, hvor man både har privatliv i egen bolig – og samtidig adgang til fællesrum og grønt område, som inviterer til nabohygge og sociale stunder.

📍 Praktisk & faciliteter

* Cykelparkering er overdækket og placeret i gårdhaven – trygt og godt.

* Har du bil, er det heller ikke et problem: Der er mulighed for at leje parkeringsplads i "Mobilitetshuset" lige overfor vejen.

* Faciliteterne inkluderer: fælleslokaler, orangeri, legeområder, cykelparkering på terræn, mv.

🎯 Hvad kan du forvente? Hvis du flytter ind her, kan du glæde dig til:

* At bo i moderne, lyse boliger med adgang til fællesarealer, der inviterer til samvær.

* At være del af et fællesskab, hvor sociale aktiviteter sker spontant og planlagt – og hvor du har mulighed for at tage del.

* At nyde grønne omgivelser midt i byen – med gårdhave og hyggekroge, som giver et roligt pusterum til hverdagen.

* At bo praktisk med både cykel- og bilparkering i nærheden.`
    },
    {
      titel: 'META Annoncering',
      dato: 'Løbende',
      tekst: `Eksperter på META annoncering håndterer alt vores annoncering af Teglgaarden.`
    }
    // Add more announcements here
  ]

  // Array of boliger - each bolig has a name and array of images
  const boliger = [
    {
      navn: '9, 2. 4',
      billeder: [
        '/teglgaarden/boliger/9, 2. 4/1.jpg',
        '/teglgaarden/boliger/9, 2. 4/2 (1).jpg',
        '/teglgaarden/boliger/9, 2. 4/2 (2).jpg',
        '/teglgaarden/boliger/9, 2. 4/3.jpg',
        '/teglgaarden/boliger/9, 2. 4/4.jpg',
        '/teglgaarden/boliger/9, 2. 4/5 (4).jpg',
        '/teglgaarden/boliger/9, 2. 4/5.jpg',
        '/teglgaarden/boliger/9, 2. 4/6.jpg',
        '/teglgaarden/boliger/9, 2. 4/Type5.png',
      ]
    },
    {
      navn: '9, 3. 3',
      billeder: [
        '/teglgaarden/boliger/9, 3. 3/1.jpg',
        '/teglgaarden/boliger/9, 3. 3/2.jpg',
        '/teglgaarden/boliger/9, 3. 3/3.jpg',
        '/teglgaarden/boliger/9, 3. 3/4.jpg',
        '/teglgaarden/boliger/9, 3. 3/5 (4).jpg',
        '/teglgaarden/boliger/9, 3. 3/5 (5).jpg',
        '/teglgaarden/boliger/9, 3. 3/5.jpg',
        '/teglgaarden/boliger/9, 3. 3/5739083.jpg',
        '/teglgaarden/boliger/9, 3. 3/6.jpg',
        '/teglgaarden/boliger/9, 3. 3/Type 10.jpg',
      ]
    },
    {
      navn: '13, 4. 1',
      billeder: [
        '/teglgaarden/boliger/13, 4. 1/5 (4).jpg',
        '/teglgaarden/boliger/13, 4. 1/5 (5).jpg',
        '/teglgaarden/boliger/13, 4. 1/5739085.jpg',
        '/teglgaarden/boliger/13, 4. 1/5739087.jpg',
        '/teglgaarden/boliger/13, 4. 1/5739089.jpg',
        '/teglgaarden/boliger/13, 4. 1/5739091.jpg',
        '/teglgaarden/boliger/13, 4. 1/5739092.jpg',
        '/teglgaarden/boliger/13, 4. 1/5739094.jpg',
        '/teglgaarden/boliger/13, 4. 1/5739096.jpg',
        '/teglgaarden/boliger/13, 4. 1/5739099.jpg',
        '/teglgaarden/boliger/13, 4. 1/Skærmbillede 2025-10-31 102641.jpg',
      ]
    },
    {
      navn: '19, 4. 1',
      billeder: [
        '/teglgaarden/boliger/19, 4. 1/1.jpg',
        '/teglgaarden/boliger/19, 4. 1/2.jpg',
        '/teglgaarden/boliger/19, 4. 1/3.jpg',
        '/teglgaarden/boliger/19, 4. 1/5 (4).jpg',
        '/teglgaarden/boliger/19, 4. 1/5 (5).jpg',
        '/teglgaarden/boliger/19, 4. 1/5739114.jpg',
        '/teglgaarden/boliger/19, 4. 1/5739120.jpg',
        '/teglgaarden/boliger/19, 4. 1/5739121.jpg',
        '/teglgaarden/boliger/19, 4. 1/Type 18.jpg',
      ]
    },
    {
      navn: '19, 4. 2',
      billeder: [
        '/teglgaarden/boliger/19, 4. 2/5 (4).jpg',
        '/teglgaarden/boliger/19, 4. 2/5 (5).jpg',
        '/teglgaarden/boliger/19, 4. 2/5739101.jpg',
        '/teglgaarden/boliger/19, 4. 2/5739103.jpg',
        '/teglgaarden/boliger/19, 4. 2/5739104.jpg',
        '/teglgaarden/boliger/19, 4. 2/5739106.jpg',
        '/teglgaarden/boliger/19, 4. 2/5739108.jpg',
        '/teglgaarden/boliger/19, 4. 2/5739110.jpg',
        '/teglgaarden/boliger/19, 4. 2/5739112.jpg',
        '/teglgaarden/boliger/19, 4. 2/Type 25.jpg',
      ]
    },
    {
      navn: '41, st',
      billeder: [
        '/teglgaarden/boliger/41, st/5 (4).jpg',
        '/teglgaarden/boliger/41, st/5 (5).jpg',
        '/teglgaarden/boliger/41, st/5739123.jpg',
        '/teglgaarden/boliger/41, st/5739124.jpg',
        '/teglgaarden/boliger/41, st/5739125.jpg',
        '/teglgaarden/boliger/41, st/5739126.jpg',
        '/teglgaarden/boliger/41, st/5739127.jpg',
        '/teglgaarden/boliger/41, st/5739128.jpg',
        '/teglgaarden/boliger/41, st/5739129.jpg',
        '/teglgaarden/boliger/41, st/5739130.jpg',
        '/teglgaarden/boliger/41, st/Skærmbillede 2025-10-31 101850.png',
      ]
    },
    {
      navn: 'Stigsborg Parkvej 19, 4. 2',
      billeder: [
        '/teglgaarden/boliger/Stigsborg Parkvej 19, 4. 2/5 (4).jpg',
        '/teglgaarden/boliger/Stigsborg Parkvej 19, 4. 2/5 (5).jpg',
        '/teglgaarden/boliger/Stigsborg Parkvej 19, 4. 2/5739101.jpg',
        '/teglgaarden/boliger/Stigsborg Parkvej 19, 4. 2/5739103.jpg',
        '/teglgaarden/boliger/Stigsborg Parkvej 19, 4. 2/5739104.jpg',
        '/teglgaarden/boliger/Stigsborg Parkvej 19, 4. 2/5739106.jpg',
        '/teglgaarden/boliger/Stigsborg Parkvej 19, 4. 2/5739108.jpg',
        '/teglgaarden/boliger/Stigsborg Parkvej 19, 4. 2/5739110.jpg',
        '/teglgaarden/boliger/Stigsborg Parkvej 19, 4. 2/5739112.jpg',
      ]
    },
    {
      navn: 'Type 5',
      billeder: [
        '/teglgaarden/boliger/Type 5/5600328.jpg',
        '/teglgaarden/boliger/Type 5/5600329.jpg',
        '/teglgaarden/boliger/Type 5/5600330.jpg',
        '/teglgaarden/boliger/Type 5/5600331.jpg',
        '/teglgaarden/boliger/Type 5/5600332.jpg',
        '/teglgaarden/boliger/Type 5/5600333.jpg',
        '/teglgaarden/boliger/Type 5/5600334.jpg',
        '/teglgaarden/boliger/Type 5/5600335.jpg',
      ]
    },
    {
      navn: 'Type 9',
      billeder: [
        '/teglgaarden/boliger/Type9/5600351.jpg',
        '/teglgaarden/boliger/Type9/5600352.jpg',
        '/teglgaarden/boliger/Type9/5600353.jpg',
        '/teglgaarden/boliger/Type9/5600354.jpg',
        '/teglgaarden/boliger/Type9/5600355.jpg',
        '/teglgaarden/boliger/Type9/5600356.jpg',
        '/teglgaarden/boliger/Type9/5600357.jpg',
        '/teglgaarden/boliger/Type9/5600358.jpg',
        '/teglgaarden/boliger/Type9/5600359.jpg',
        '/teglgaarden/boliger/Type9/5600360.jpg',
      ]
    },
    {
      navn: 'Type 17',
      billeder: [
        '/teglgaarden/boliger/Type 17/5600336.jpg',
        '/teglgaarden/boliger/Type 17/5600337.jpg',
        '/teglgaarden/boliger/Type 17/5600338.jpg',
        '/teglgaarden/boliger/Type 17/5600339.jpg',
        '/teglgaarden/boliger/Type 17/5600340.jpg',
        '/teglgaarden/boliger/Type 17/5600341.jpg',
        '/teglgaarden/boliger/Type 17/5600342.jpg',
        '/teglgaarden/boliger/Type 17/5600343.jpg',
        '/teglgaarden/boliger/Type 17/5600344.jpg',
        '/teglgaarden/boliger/Type 17/5600345.jpg',
        '/teglgaarden/boliger/Type 17/5600346.jpg',
        '/teglgaarden/boliger/Type 17/5600347.jpg',
        '/teglgaarden/boliger/Type 17/5600348.jpg',
        '/teglgaarden/boliger/Type 17/5600349.jpg',
        '/teglgaarden/boliger/Type 17/5600350.jpg',
      ]
    }
  ]

  useEffect(() => {
    // Check if user has access to teglgaarden page
    const hasAccess = localStorage.getItem('teglgaarden_access')
    if (hasAccess !== 'true') {
      router.push('/')
      return
    }
    setIsLoading(false)
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-gray-200 border-t-gray-900 rounded-full"
        />
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white"
    >
      {/* Minimal Top Navigation */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-100"
      >
        <div className="w-full py-6">
          <div className="flex items-center justify-between pr-8">
            <div className="flex items-center space-x-8 pl-0">
              <div className="flex items-center space-x-4">
                <Image
                  src="/logo.png"
                  alt="Kunder Logo"
                  width={150}
                  height={48}
                  className="h-10 w-auto object-contain"
                />
                <p className="text-sm font-light text-gray-600 whitespace-nowrap">
                  Din udlejningmaegler / Din Mægler
                </p>
              </div>
              <nav className="hidden md:flex items-center space-x-1">
                <button className="px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
                  Oversigt
                </button>
              </nav>
            </div>
            <button
              onClick={() => {
                localStorage.removeItem('teglgaarden_access')
                router.push('/')
              }}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
            >
              Log ud
            </button>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-8">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-20"
          >
            <h1 className="text-5xl md:text-6xl font-light text-gray-900 mb-4 tracking-tight">
              Teglgaarden
            </h1>
            <p className="text-xl text-gray-500 font-light max-w-2xl">
              Oversigt over tiltag, videoer og annoncer
            </p>
          </motion.div>

          {/* Tiltag Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-24"
          >
            <div className="flex items-center space-x-3 mb-12">
              <CheckCircle2 className="w-6 h-6 text-gray-900" />
              <h2 className="text-3xl font-light text-gray-900">Tiltag</h2>
            </div>

            {/* Faste Tiltag Hver Uge */}
            <div className="mb-20">
              <h3 className="text-xl font-light text-gray-700 mb-10">Faste tiltag hver uge</h3>
              <div className="grid md:grid-cols-3 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="border-2 border-gray-200 rounded-2xl p-8 hover:border-gray-300 hover:shadow-lg transition-all bg-white group shadow-sm"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                      <Megaphone className="w-6 h-6 text-gray-700" />
                    </div>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-3">
                    Annoncering på sociale medier
                  </h4>
                  <p className="text-base text-gray-600 font-light leading-relaxed mb-4">
                    Annoncering på sociale medier hver dag
                  </p>
                  <div className="text-sm text-gray-500 font-light">
                    Gentages dagligt
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="border-2 border-gray-200 rounded-2xl p-8 hover:border-gray-300 hover:shadow-lg transition-all bg-white group shadow-sm"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                      <CheckCircle2 className="w-6 h-6 text-gray-700" />
                    </div>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-3">
                    Åbent hus
                  </h4>
                  <p className="text-base text-gray-600 font-light leading-relaxed mb-4">
                    Åbent hus fra 09-17 hver onsdag
                  </p>
                  <div className="text-sm text-gray-500 font-light">
                    Hver onsdag
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="border-2 border-gray-200 rounded-2xl p-8 hover:border-gray-300 hover:shadow-lg transition-all bg-white group shadow-sm"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                      <CheckCircle2 className="w-6 h-6 text-gray-700" />
                    </div>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-3">
                    Åbent hus
                  </h4>
                  <p className="text-base text-gray-600 font-light leading-relaxed mb-4">
                    Åbent hus fra 11-13 hver søndag
                  </p>
                  <div className="text-sm text-gray-500 font-light">
                    Hver søndag
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Ekstra Tiltag I November */}
            <div>
              <h3 className="text-xl font-light text-gray-700 mb-10">Ekstra tiltag i november</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="border-2 border-gray-200 rounded-2xl p-8 hover:border-gray-300 hover:shadow-lg transition-all bg-white group shadow-sm"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                      <CheckCircle2 className="w-6 h-6 text-gray-700" />
                    </div>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-3">
                    Stort åbent hus
                  </h4>
                  <p className="text-base text-gray-600 font-light leading-relaxed mb-3">
                    Stort åbent hus fra 10-13
                  </p>
                  <p className="text-lg text-gray-900 font-semibold mb-4">
                    09-11-2025
                  </p>
                  <p className="text-sm text-gray-500 font-light">
                    Boller og kaffe fra Surdejsbageren
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="border-2 border-gray-200 rounded-2xl p-8 hover:border-gray-300 hover:shadow-lg transition-all bg-white group shadow-sm"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                      <CheckCircle2 className="w-6 h-6 text-gray-700" />
                    </div>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-3">
                    Stort åbent hus
                  </h4>
                  <p className="text-base text-gray-600 font-light leading-relaxed mb-3">
                    Stort åbent hus fra 10-13
                  </p>
                  <p className="text-lg text-gray-900 font-semibold mb-4">
                    16-11-2025
                  </p>
                  <p className="text-sm text-gray-500 font-light">
                    Boller og kaffe fra Surdejsbageren
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.section>

          {/* Videoer Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-24"
          >
            <div className="flex items-center space-x-3 mb-12">
              <Play className="w-6 h-6 text-gray-900" />
              <h2 className="text-3xl font-light text-gray-900">Videoer</h2>
            </div>
            
            {videoer.length > 0 ? (
              <div className="relative">
                {/* Navigation Buttons */}
                <button
                  onClick={handlePrevVideo}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center hover:bg-gray-800 shadow-lg transition-all hover:scale-110 -ml-16 md:-ml-20"
                  aria-label="Forrige video"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                
                <button
                  onClick={handleNextVideo}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center hover:bg-gray-800 shadow-lg transition-all hover:scale-110 -mr-16 md:-mr-20"
                  aria-label="Næste video"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>

                {/* Carousel Container */}
                <div className="overflow-hidden">
                  <div className="flex transition-transform duration-300 ease-in-out" style={{ transform: `translateX(-${currentVideoIndex * (100 / 2)}%)` }}>
                    {videoer.map((videoPath: string, index: number) => {
                      const videoTitle = videoPath.split('/').pop()?.replace(/\.(mp4|webm|mov|avi|MOV)$/i, '') || `Video ${index + 1}`
                      return (
                        <div
                          key={index}
                          className="min-w-[50%] md:min-w-[40%] lg:min-w-[33.333%] flex flex-col items-center px-3 md:px-6"
                        >
                          <div className="aspect-[9/16] relative bg-gray-50 overflow-hidden w-full rounded-2xl">
                            {playingVideo === videoPath ? (
                              <video
                                src={videoPath}
                                controls
                                autoPlay
                                className="w-full h-full object-contain rounded-2xl bg-black"
                                onEnded={() => setPlayingVideo(null)}
                              />
                            ) : (
                              <>
                                {videoThumbnails[videoPath] ? (
                                  <div className="relative w-full h-full">
                                    <img
                                      src={videoThumbnails[videoPath]}
                                      alt={videoTitle}
                                      className="w-full h-full object-cover rounded-2xl"
                                    />
                                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center cursor-pointer rounded-2xl group-hover:bg-black/10 transition-colors"
                                      onClick={() => setPlayingVideo(videoPath)}
                                    >
                                      <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:bg-white group-hover:scale-110 transition-transform shadow-lg">
                                        <Play className="w-6 h-6 text-gray-900 ml-1" />
                                      </div>
                                    </div>
                                  </div>
                                ) : (
                                  <>
                                    <video
                                      ref={(video) => {
                                        if (video && !videoThumbnails[videoPath]) {
                                          generateThumbnail(videoPath, video)
                                        }
                                      }}
                                      src={videoPath}
                                      className="w-full h-full object-cover opacity-0 rounded-2xl pointer-events-none"
                                      preload="metadata"
                                      muted
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center cursor-pointer rounded-2xl"
                                      onClick={() => setPlayingVideo(videoPath)}
                                    >
                                      <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:bg-white group-hover:scale-110 transition-transform">
                                        <Play className="w-6 h-6 text-gray-900 ml-1" />
                                      </div>
                                    </div>
                                  </>
                                )}
                              </>
                            )}
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 mt-4 text-center">
                            {videoTitle}
                          </h3>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Dot Indicators */}
                <div className="flex justify-center gap-2 mt-8">
                  {Array.from({ length: Math.ceil(videoer.length / 2) }).map((_, groupIndex) => {
                    const startIndex = groupIndex * 2
                    const isActive = currentVideoIndex >= startIndex && currentVideoIndex < startIndex + 2
                    return (
                      <button
                        key={groupIndex}
                        onClick={() => handleVideoIndexChange(startIndex)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          isActive 
                            ? 'bg-gray-900 w-8' 
                            : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                        aria-label={`Gå til video ${startIndex + 1}`}
                      />
                    )
                  })}
                </div>
              </div>
            ) : (
              <div className="border-2 border-gray-200 rounded-2xl p-12 bg-gray-50/50 text-center">
                <div className="max-w-md mx-auto">
                  <Play className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Ingen videoer endnu
                  </h3>
                  <p className="text-sm text-gray-500 font-light mb-4">
                    Upload videoer til{' '}
                    <code className="px-2 py-1 bg-gray-100 rounded text-xs font-mono">
                      /public/teglgaarden/videoer/
                    </code>
                  </p>
                  <p className="text-xs text-gray-400 font-light">
                    Tilføj videostier til <code className="text-xs">videoer</code> arrayet i koden
                  </p>
                </div>
              </div>
            )}
          </motion.section>

          {/* Boligbilleder Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-24"
          >
            <div className="flex items-center space-x-3 mb-12">
              <Home className="w-6 h-6 text-gray-900" />
              <h2 className="text-3xl font-light text-gray-900">Boligbilleder</h2>
            </div>
            
            {boliger.length > 0 ? (
              <div className="space-y-4">
                {boliger.map((bolig, boligIndex) => {
                  const isOpen = openBoliger.includes(boligIndex)
                  return (
                    <motion.div
                      key={boligIndex}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + boligIndex * 0.1 }}
                      className="border-2 border-gray-200 rounded-2xl bg-white shadow-sm overflow-hidden"
                    >
                      {/* Bolig Case Header */}
                      <button
                        onClick={() => toggleBolig(boligIndex)}
                        className="w-full px-8 py-6 flex items-center justify-between hover:bg-gray-50 transition-colors group"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                            <Home className="w-6 h-6 text-gray-700" />
                          </div>
                          <div className="text-left">
                            <h3 className="text-xl font-semibold text-gray-900 mb-1">
                              {bolig.navn}
                            </h3>
                            <p className="text-sm text-gray-500 font-light">
                              {bolig.billeder.length} {bolig.billeder.length === 1 ? 'billede' : 'billeder'}
                            </p>
                          </div>
                        </div>
                        <motion.div
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown className="w-6 h-6 text-gray-500" />
                        </motion.div>
                      </button>

                      {/* Expandable Images Grid */}
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-8 pb-8 pt-4">
                              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {bolig.billeder.map((imagePath: string, imageIndex: number) => (
                                  <motion.div
                                    key={imageIndex}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: imageIndex * 0.05 }}
                                    className="border-2 border-gray-200 rounded-xl overflow-hidden hover:border-gray-300 hover:shadow-lg transition-all bg-white group cursor-pointer shadow-sm"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      setSelectedImage(imagePath)
                                    }}
                                  >
                                    <div className="aspect-[4/3] relative overflow-hidden bg-gray-50">
                                      <Image
                                        src={imagePath}
                                        alt={`${bolig.navn} - ${imagePath.split('/').pop()}`}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                      />
                                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                                    </div>
                                    <div className="p-3">
                                      <p className="text-xs font-medium text-gray-900">
                                        {imagePath.split('/').pop()?.replace(/\.(jpg|jpeg|png)$/i, '') || `Billede ${imageIndex + 1}`}
                                      </p>
                                    </div>
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )
                })}
              </div>
            ) : (
              <div className="border-2 border-gray-200 rounded-2xl p-12 bg-gray-50/50 text-center">
                <div className="max-w-md mx-auto">
                  <Home className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Ingen billeder endnu
                  </h3>
                  <p className="text-sm text-gray-500 font-light mb-4">
                    Upload boligbilleder til{' '}
                    <code className="px-2 py-1 bg-gray-100 rounded text-xs font-mono">
                      /public/teglgaarden/boliger/
                    </code>
                  </p>
                  <p className="text-xs text-gray-400 font-light">
                    Tilføj boliger til <code className="text-xs">boliger</code> arrayet i koden
                  </p>
                </div>
              </div>
            )}
          </motion.section>

          {/* Annoncer Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mb-24"
          >
            <div className="flex items-center space-x-3 mb-12">
              <Megaphone className="w-6 h-6 text-gray-900" />
              <h2 className="text-3xl font-light text-gray-900">Annoncer</h2>
            </div>
            
            {annoncer.length > 0 && (
              <div className="mb-12">
                <div className="space-y-6">
                  {annoncer.map((annonce, index) => {
                    const isOpen = openAnnoncer.includes(index)
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 + index * 0.1 }}
                        className="border-2 border-gray-200 rounded-2xl overflow-hidden hover:border-gray-300 hover:shadow-lg transition-all bg-white shadow-sm"
                      >
                        {/* Annonce Header */}
                        <button
                          onClick={() => toggleAnnonce(index)}
                          className="w-full px-8 py-6 flex items-center justify-between hover:bg-gray-50 transition-colors group text-left"
                        >
                          <div className="flex items-center space-x-4 flex-1">
                            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                              <Calendar className="w-6 h-6 text-gray-700" />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-xl font-semibold text-gray-900 mb-1">
                                {annonce.titel}
                              </h3>
                              <p className="text-sm text-gray-500 font-light">
                                {annonce.dato}
                              </p>
                            </div>
                          </div>
                          <motion.div
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ChevronDown className="w-6 h-6 text-gray-500" />
                          </motion.div>
                        </button>

                        {/* Expandable Content */}
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="px-8 pb-8 pt-4">
                                <div className="space-y-8">
                            {annonce.tekst.split(/\n\n+/).filter(p => p.trim()).map((paragraph: string, idx: number) => {
                              const trimmed = paragraph.trim()
                              
                              // Check if paragraph starts with an emoji header (🌿, 🧑‍🤝‍🧑, 📍, 🎯)
                              const emojiHeaderMatch = trimmed.match(/^([🌿🧑‍🤝‍🧑📍🎯])\s+(.+)/)
                              if (emojiHeaderMatch) {
                                const emoji = emojiHeaderMatch[1]
                                const rest = emojiHeaderMatch[2]
                                
                                // Check if there's a colon in the first line
                                const firstLine = rest.split('\n')[0]
                                const colonIndex = firstLine.indexOf(':')
                                
                                let title: string
                                let introAfterColon: string | null = null
                                let content: string
                                
                                if (colonIndex !== -1) {
                                  // Split at colon
                                  title = firstLine.substring(0, colonIndex).trim()
                                  const afterColon = firstLine.substring(colonIndex + 1).trim()
                                  const remainingLines = rest.split('\n').slice(1).join('\n').trim()
                                  
                                  if (afterColon) {
                                    introAfterColon = afterColon
                                  }
                                  content = remainingLines
                                } else {
                                  // No colon, check for question mark
                                  const questionIndex = firstLine.indexOf('?')
                                  if (questionIndex !== -1) {
                                    title = firstLine.substring(0, questionIndex + 1).trim()
                                    const afterQuestion = firstLine.substring(questionIndex + 1).trim()
                                    const remainingLines = rest.split('\n').slice(1).join('\n').trim()
                                    
                                    if (afterQuestion) {
                                      introAfterColon = afterQuestion
                                    }
                                    content = remainingLines
                                  } else {
                                    title = firstLine
                                    content = rest.split('\n').slice(1).join('\n').trim()
                                  }
                                }
                                
                                return (
                                  <div key={idx} className="space-y-5">
                                    <h4 className="text-2xl font-bold text-gray-900 flex items-center space-x-3">
                                      <span className="text-2xl">{emoji}</span>
                                      <span>{title}{colonIndex !== -1 ? ':' : ''}</span>
                                    </h4>
                                    {introAfterColon && (
                                      <p className="text-lg font-bold text-gray-900 leading-relaxed">
                                        {introAfterColon}
                                      </p>
                                    )}
                                    <div className="space-y-3.5 ml-4">
                                      {content.split('\n').filter(line => line.trim()).map((line: string, lineIdx: number) => {
                                        const trimmedLine = line.trim()
                                        if (trimmedLine.startsWith('*')) {
                                          return (
                                            <div key={lineIdx} className="flex items-start space-x-4">
                                              <span className="text-gray-500 mt-2 flex-shrink-0 text-lg">•</span>
                                              <span className="flex-1 text-base leading-relaxed">{trimmedLine.replace(/^\*\s*/, '')}</span>
                                            </div>
                                          )
                                        }
                                        return trimmedLine && (
                                          <p key={lineIdx} className="text-base leading-relaxed text-gray-700">{trimmedLine}</p>
                                        )
                                      })}
                                    </div>
                                  </div>
                                )
                              }
                              
                              // Regular paragraph (intro text)
                              if (trimmed.startsWith('Hej')) {
                                return (
                                  <div key={idx} className="space-y-4">
                                    <p className="text-xl font-semibold text-gray-900 leading-relaxed">
                                      {trimmed.split('\n').map((line: string, lineIdx: number, lines: string[]) => (
                                        <span key={lineIdx}>
                                          {line}
                                          {lineIdx < lines.length - 1 && <br />}
                                        </span>
                                      ))}
                                    </p>
                                  </div>
                                )
                              }
                              
                              if (trimmed.startsWith('MEN')) {
                                return (
                                  <p key={idx} className="text-lg font-semibold text-gray-900 leading-relaxed italic">
                                    {trimmed}
                                  </p>
                                )
                              }
                              
                              return (
                                <p key={idx} className="text-base leading-relaxed text-gray-700">
                                  {trimmed.split('\n').map((line: string, lineIdx: number, lines: string[]) => (
                                    <span key={lineIdx}>
                                      {line}
                                      {lineIdx < lines.length - 1 && <br />}
                                    </span>
                                  ))}
                                </p>
                              )
                            })}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            )}
          </motion.section>
        </div>
      </main>

      {/* Lightbox Modal for Images */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-6xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
              >
                <X className="w-8 h-8" />
              </button>
              <div className="relative w-full h-full aspect-video">
                <Image
                  src={selectedImage}
                  alt="Boligbillede"
                  fill
                  className="object-contain rounded-lg"
                  sizes="90vw"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
