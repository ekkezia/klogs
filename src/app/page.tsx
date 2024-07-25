
import LandingPageAnimation from '@/components/template/landing-page/landing-page-animation.component';
import LandingPageHero from '@/components/template/landing-page/landing-page-hero.component';
import NewsroomContent from '@/components/template/newsroom/articles/newsroom-content.component';

export const HERO_TOP = '30vh';
export const HERO_TOP_SM = '25vh';
export const CONTENT_TOP = '40vh';
export const CONTENT_TOP_SM = '35vh';

export default function Home() {
  return (
    <div className="h-[200vh]">
      <LandingPageAnimation />
      <LandingPageHero />
      <div className="relative top-[100vh]">
        <NewsroomContent />
      </div>
    </div>
  );
}
