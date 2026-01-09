"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMindScore } from "@/features/mind-score";
import {
  MindWidget,
  useScrollAwareTrainingVisibility,
} from "@/features/mind-widget";
import { MindWidgetSubtle } from "@/features/mind-widget/mind-widget-subtle";
import { MindWidgetWithAdd } from "@/features/mind-widget/mind-widget-with-add";
import { useContainerScrollDirectionElement } from "@/hooks/use-container-scroll-direction";
import { useCallback, useState } from "react";
import { PlaceholderParagraphs } from "../components/placeholder-paragraphs";
import { VariantCard } from "../components/variants-card";
import { VariantsCardTitle } from "../components/variants-card-title";
import { VariantsGrid } from "../components/variants-grid";

export default function MindView() {
  const { current } = useMindScore();

  // Track scroll container as state so changes trigger re-renders
  const [scrollContainer, setScrollContainer] = useState<HTMLDivElement | null>(
    null
  );

  // Callback ref updates state when element changes (e.g., on tab switch)
  const scrollContainerRef = useCallback((node: HTMLDivElement | null) => {
    setScrollContainer(node);
  }, []);

  // Use element-based hook that reacts to container changes
  const isScrollingDown = useContainerScrollDirectionElement(scrollContainer);

  // Control training visibility based on scroll direction
  useScrollAwareTrainingVisibility(isScrollingDown);

  return (
    <div className='h-full py-4 max-w-7xl mx-auto pl-[80px] '>
      <Tabs defaultValue='mind-widget' className='h-full'>
        <TabsList className='mb-20'>
          <TabsTrigger value='mind-widget'>Default</TabsTrigger>
          <TabsTrigger value='mind-widget-with-add'>
            With Add Button
          </TabsTrigger>
          <TabsTrigger value='subtle-training-status'>
            Subtle Training Status
          </TabsTrigger>
        </TabsList>

        <div className='flex flex-col gap-4 h-full'>
          <TabsContent value='mind-widget' className='space-y-2'>
            <VariantsGrid>
              <VariantCard>
                <VariantsCardTitle>Default: Studio home</VariantsCardTitle>
                <div className='flex flex-col items-center justify-center pt-2'>
                  <MindWidget score={current} />
                </div>
              </VariantCard>
              <VariantCard className='p-0'>
                <VariantsCardTitle>
                  Compact Vertical: Profile, IM, Onboarding
                </VariantsCardTitle>
                <div className='relative w-full h-full'>
                  <div className='absolute top-0 inset-x-0 flex items-center justify-center pointer-events-none bg-gradient-to-b from-sand-1 to-transparent dark:from-black py-16'>
                    <div className='pointer-events-auto'>
                      <MindWidget score={current} variant='compact-vertical' />
                    </div>
                  </div>
                  <div
                    ref={scrollContainerRef}
                    className='w-full h-full overflow-y-auto px-12 py-[160px]'
                  >
                    <h2 className='text-2xl font-semibold mb-4'>
                      Sample Content
                    </h2>
                    <PlaceholderParagraphs />
                  </div>
                </div>
              </VariantCard>
            </VariantsGrid>

            <VariantsGrid>
              <VariantCard>
                <VariantsCardTitle>Compact: Mind dialog</VariantsCardTitle>
                <div className='flex flex-col items-center justify-center pt-2'>
                  <MindWidget score={current} variant='compact' />
                </div>
              </VariantCard>
            </VariantsGrid>
          </TabsContent>

          <TabsContent value='mind-widget-with-add' className='space-y-2'>
            <VariantsGrid>
              <VariantCard>
                <VariantsCardTitle>Default: Studio home</VariantsCardTitle>
                <div className='flex flex-col items-center justify-center pt-2'>
                  <MindWidgetWithAdd score={current} />
                </div>
              </VariantCard>
              <VariantCard className='p-0'>
                <VariantsCardTitle>
                  Compact Vertical: Profile, IM, Onboarding
                </VariantsCardTitle>
                <div className='relative w-full h-full'>
                  <div className='absolute top-0 inset-x-0 flex items-center justify-center pointer-events-none bg-gradient-to-b from-sand-1 to-transparent dark:from-black py-16'>
                    <div className='pointer-events-auto'>
                      <MindWidgetWithAdd
                        score={current}
                        variant='compact-vertical'
                      />
                    </div>
                  </div>
                  <div
                    ref={scrollContainerRef}
                    className='w-full h-full overflow-y-auto px-12 py-[160px]'
                  >
                    <h2 className='text-2xl font-semibold mb-4'>
                      Sample Content
                    </h2>
                    <PlaceholderParagraphs />
                  </div>
                </div>
              </VariantCard>
            </VariantsGrid>

            <VariantsGrid>
              <VariantCard>
                <VariantsCardTitle>Compact: Mind dialog</VariantsCardTitle>
                <div className='flex flex-col items-center justify-center pt-2'>
                  <MindWidgetWithAdd score={current} variant='compact' />
                </div>
              </VariantCard>
            </VariantsGrid>
          </TabsContent>

          <TabsContent value='subtle-training-status' className='space-y-2'>
            <VariantsGrid>
              <VariantCard>
                <VariantsCardTitle>Default: Studio home</VariantsCardTitle>
                <div className='flex flex-col items-center justify-center pt-2'>
                  <MindWidgetSubtle score={current} variant='default' />
                </div>
              </VariantCard>
              <VariantCard className='p-0'>
                <VariantsCardTitle>
                  Compact Vertical: Profile, IM, Onboarding
                </VariantsCardTitle>
                <div className='relative w-full h-full'>
                  <div className='absolute top-0 inset-x-0 flex items-center justify-center pointer-events-none bg-gradient-to-b from-sand-1 to-transparent dark:from-black py-16'>
                    <div className='pointer-events-auto'>
                      <MindWidgetSubtle
                        score={current}
                        variant='compact-vertical'
                      />
                    </div>
                  </div>
                  <div
                    ref={scrollContainerRef}
                    className='w-full h-full overflow-y-auto px-12 py-[160px]'
                  >
                    <h2 className='text-2xl font-semibold mb-4'>
                      Sample Content
                    </h2>
                    <PlaceholderParagraphs />
                  </div>
                </div>
              </VariantCard>
            </VariantsGrid>

            <VariantsGrid>
              <VariantCard>
                <VariantsCardTitle>Default: Studio home</VariantsCardTitle>
                <div className='flex flex-col items-center justify-center pt-2'>
                  <MindWidgetSubtle score={current} variant='compact' />
                </div>
              </VariantCard>
            </VariantsGrid>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
