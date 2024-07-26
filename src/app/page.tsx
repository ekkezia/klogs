import LandingPageAnimation from "@/components/template/landing-page/landing-page-animation.component"
import LandingPageHero from "@/components/template/landing-page/landing-page-hero.component"

export default function Home() {
  return (
    <div className="h-fit">
      <LandingPageAnimation />
      <LandingPageHero />
        <div className="h-[100vh] relative top-[100vh]"/>
    </div>
  )
}
