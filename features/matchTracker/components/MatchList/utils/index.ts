import { InternalFixture } from "@/types/InternalFixture";

export const isMatchSelected = (
  selectedMatch: InternalFixture | null,
  fixture: InternalFixture
) => selectedMatch?.fixtureId === fixture.fixtureId;
