import React, { useMemo } from 'react';
import { PageType } from './BossiHeader';

export default function useSelectedPageTypes(
  pageTypes: PageType[],
  pathArray: string[]
) {
  return useMemo(() => {
    let selectedPageType: PageType | undefined = pageTypes.filter(
      (pageType: PageType) => pageType.file === pathArray[0]
    )[0];
    let newPathArray = pathArray.slice(1);

    if (selectedPageType) {
      selectedPageType.isSelected = true;
    }

    newPathArray.forEach((filename: string) => {
      selectedPageType = selectedPageType?.pages?.filter(
        (pageType: PageType) => pageType.file === filename
      )[0];

      if (selectedPageType) {
        selectedPageType.isSelected = true;
      }
    });

    return selectedPageType;
  }, [pageTypes, pathArray]);
}
