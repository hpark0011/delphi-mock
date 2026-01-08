import { StudioSectionWrapper } from "@/app/studio/_components/studio-section-wrapper";

export default function StudioLoading() {
  // #region agent log
  fetch("http://127.0.0.1:7243/ingest/3defb6de-43b2-4f94-a176-53fbf2c88ac0", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      location: "studio/loading.tsx:7",
      message: "StudioLoading server component rendering",
      data: { timestamp: Date.now() },
      timestamp: Date.now(),
      sessionId: "debug-session",
      runId: "post-fix",
      hypothesisId: "C,D",
    }),
  }).catch(() => {});
  // #endregion
  return (
    <div className='px-4 max-w-2xl relative mx-auto'>
      {/* Header skeleton (MindWidget) */}
      <div className='hidden lg:block sticky top-0 z-50 w-full px-4 py-4 left-0'>
        <div className='flex flex-col gap-2 items-center justify-center'>
          <div className='animate-pulse bg-light/50 rounded-full size-16' />
        </div>
      </div>

      <div className='relative z-10 py-20'>
        {/* Greeting skeleton */}
        <div className='px-4 mb-8'>
          <div className='animate-pulse h-9 w-64 rounded-lg bg-light/50 mx-auto' />
        </div>

        <div className='flex gap-2'>
          <div className='w-full flex flex-col gap-2'>
            {/* Tasks skeleton */}
            <StudioSectionWrapper className='w-full p-1.5 rounded-[24px]'>
              <div className='space-y-2 w-full'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2.5 p-2'>
                    <div className='animate-pulse w-8 h-8 bg-light/50 rounded-lg' />
                    <div className='animate-pulse h-5 w-28 rounded bg-light/50' />
                  </div>
                </div>
                <div className='grid grid-cols-2 gap-2'>
                  {[1, 2].map((i) => (
                    <div
                      key={i}
                      className='animate-pulse bg-light/50 rounded-[20px] h-[100px]'
                    />
                  ))}
                </div>
              </div>
            </StudioSectionWrapper>

            {/* Analytics and Highlights */}
            <div className='flex lg:flex-row gap-2 flex-col'>
              {/* Analytics skeleton */}
              <StudioSectionWrapper className='rounded-[22px] gap-1 flex flex-col w-full'>
                <div className='flex items-center justify-between py-2 pr-2 pl-3'>
                  <div className='animate-pulse h-4 w-32 rounded bg-light/50' />
                  <div className='animate-pulse size-4 rounded bg-light/50' />
                </div>
                <div className='flex flex-col rounded-[18px] overflow-hidden shadow-card-primary bg-card'>
                  {[1, 2].map((i) => (
                    <div key={i}>
                      <div className='p-3.5 py-3 pr-3'>
                        <div className='flex w-full flex-col gap-2'>
                          <div className='animate-pulse h-4 w-24 rounded bg-light/50' />
                          <div className='flex items-center justify-between'>
                            <div className='animate-pulse h-7 w-16 rounded bg-light/50' />
                            <div className='animate-pulse h-6 w-14 rounded-full bg-light/50' />
                          </div>
                        </div>
                      </div>
                      {i < 2 && (
                        <div className='h-[1px] min-h-[1px] bg-sand-3 dark:bg-sand-2' />
                      )}
                    </div>
                  ))}
                </div>
              </StudioSectionWrapper>

              {/* Highlights skeleton */}
              <StudioSectionWrapper className='rounded-[22px] gap-1 flex flex-col w-full'>
                <div className='flex items-center justify-between py-2 pr-2 pl-3'>
                  <div className='animate-pulse h-4 w-20 rounded bg-light/50' />
                  <div className='animate-pulse size-4 rounded bg-light/50' />
                </div>
                <div className='flex flex-col rounded-[18px] overflow-hidden shadow-card-primary bg-card'>
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i}>
                      <div className='p-3.5 py-3 pr-3'>
                        <div className='flex w-full items-center justify-between'>
                          <div className='animate-pulse h-4 w-32 rounded bg-light/50' />
                          <div className='animate-pulse h-6 w-8 rounded-full bg-light/50' />
                        </div>
                      </div>
                      {i < 4 && (
                        <div className='h-[1px] bg-[#EBEBE9] dark:bg-[#171715]' />
                      )}
                    </div>
                  ))}
                </div>
              </StudioSectionWrapper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
