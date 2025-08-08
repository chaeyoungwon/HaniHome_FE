import { usePathname, useRouter, useSearchParams } from "next/navigation";

type FunnelStep = Readonly<{
  step: string;
  subSteps?: readonly string[];
}>;

export const useFunnel = ({ steps }: { steps: readonly FunnelStep[] }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const getLatestParams = () => {
    const sp = new URLSearchParams(window.location.search);
    const step = sp.get("step") || steps[0].step;
    const subStep = sp.get("subStep");
    return { step, subStep, sp };
  };

  const findCurrentPosition = (step: string, subStep: string | null) => {
    const stepIndex = steps.findIndex(s => s.step === step);
    if (stepIndex === -1) return null;

    const currentStep = steps[stepIndex];
    const subStepIndex =
      subStep && currentStep.subSteps
        ? currentStep.subSteps.indexOf(subStep)
        : -1;

    return { stepIndex, subStepIndex };
  };

  const goTo = (step: string, subStep?: string) => {
    const sp = new URLSearchParams();
    sp.set("step", step);
    if (subStep) sp.set("subStep", subStep);

    const draftId = searchParams.get("draftId");
    if (draftId) sp.set("draftId", draftId);

    router.push(`${pathname}?${sp.toString()}`, { scroll: false });
  };

  const onNextStep = () => {
    const { step, subStep } = getLatestParams();
    const pos = findCurrentPosition(step, subStep);
    if (!pos) return;

    const { stepIndex, subStepIndex } = pos;
    const current = steps[stepIndex];

    // 다음 subStep
    if (
      current.subSteps &&
      subStepIndex >= 0 &&
      subStepIndex < current.subSteps.length - 1
    ) {
      goTo(current.step, current.subSteps[subStepIndex + 1]);
      return;
    }

    // 다음 step
    const next = steps[stepIndex + 1];
    if (next) {
      goTo(next.step, next.subSteps?.[0]);
    }
  };

  const onPrevStep = () => {
    const { step, subStep } = getLatestParams();
    const pos = findCurrentPosition(step, subStep);
    if (!pos) return;

    const { stepIndex, subStepIndex } = pos;
    const current = steps[stepIndex];

    //  subStep이 있는 스텝인데 현재 subStep이 잘못되었거나 빠져있는 경우
    if (current.subSteps && subStepIndex === -1) {
      goTo(current.step, current.subSteps[0]); // 첫 subStep으로 강제 이동
      return;
    }

    // 이전 subStep
    if (current.subSteps && subStepIndex > 0) {
      goTo(current.step, current.subSteps[subStepIndex - 1]);
      return;
    }

    // 이전 step
    const prev = steps[stepIndex - 1];
    if (prev) {
      goTo(
        prev.step,
        prev.subSteps ? prev.subSteps[prev.subSteps.length - 1] : undefined,
      );
    }
  };

  const currentStep = searchParams.get("step") || steps[0].step;
  const currentSubStep = searchParams.get("subStep");

  return {
    step: currentStep,
    subStep: currentSubStep,
    onNextStep,
    onPrevStep,
  };
};
