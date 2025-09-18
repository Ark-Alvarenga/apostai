import {
  FeaturesSection,
  FAQSection,
  SubscribeSection,
  HomeFormSection,
  SeenInSection,
  TheProblemSection,
  TheSolutionSection,
  UserReviewSection,
  LatestUpdatesSection,
  ActionSection,
  HomeHeader,
  HomeOldMatchsSection,
} from "@/components";

export default function Home() {
  return (
    <>
      <HomeHeader />
      <div className="bg-theme-gray-500 scrollbar-hide">
        <HomeFormSection />
        <SeenInSection />
        <TheProblemSection />
        <TheSolutionSection />
        <UserReviewSection />
        <LatestUpdatesSection />
        <FeaturesSection />
        <FAQSection />
        <SubscribeSection overrideCTAClick />
        <ActionSection />
      </div>
    </>
  );
}
