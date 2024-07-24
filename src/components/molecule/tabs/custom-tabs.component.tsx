/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import CustomTab from './custom-tab.component';

type IFunction = (...args: any[]) => any;
export interface ILabel {
  [key: string]: string;
}

interface ICustomTabs {
  tabs: string[];
  labels: ILabel;
  fitContent?: boolean;
  disableMultipleSelect?: boolean;
  activeTab: string;
  setActiveTab: IFunction;
}

// when you first declare CustomTabs component, the param tabs will be filled with default tabs
const CustomTabs: React.FC<ICustomTabs> = ({
  tabs,
  labels,
  fitContent,
  activeTab,
  setActiveTab,
}) => {
  const styles = {
    container: css`
      display: flex;
      align-items: center;
      width: ${fitContent ? 'fit-content' : '100%'};
      height: ${fitContent ? 'fit-content' : '100%'};
    `,
  };

  const handleClickTab = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div css={styles.container}>
      {tabs.map((tab, index) => (
        <CustomTab
          key={index}
          tabName={tab}
          label={labels[tab]}
          onClick={handleClickTab}
          active={tab === activeTab}
          fitContent={fitContent}
        />
      ))}
    </div>
  );
};

export default CustomTabs;
