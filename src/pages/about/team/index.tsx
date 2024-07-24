import React, { useEffect, useState } from 'react';
import TeamGrid from '../../../components/template/about/team/team-grid.component';
import TeamHero from '../../../components/template/about/team/team-hero.component';
import { Employee, getAllEmployees } from '../../../api-service/employee';
import { Box } from '@mui/material';
import EmployeeInfoModal from '../../../components/template/about/team/employee-info-modal.component';
import ContentBox from '../../../components/atoms/box/content-box.component';
import CustomHead from '../../../components/organism/custom-head/custom-head.component';
import TeamTabs, {
  TEAM_TABS,
} from '../../../components/template/about/team/team-tabs.component';
import Loading from '../../../components/atoms/loading/loading.component';
import { getQueryParam, updateQueryParam } from '../../../hooks/useQueryParams';
import toCamelCase, {
  replaceCharacterWith,
} from '../../../utils/convertString';
import { useRouter } from 'next/navigation';
import StickyHeader from '../../../components/organism/sticky-header/sticky-header.component';
import TeamShortInfo from '../../../components/template/about/team/team-short-info.component';

export const EMPLOYEE_SHORT_INFO_HEIGHT = '120px';

const filterList = ['Ming-Yam Wong'];

function filterArrayByNames(initialArray: Employee[], filterList: string[]) {
  return initialArray.filter((item) => !filterList.includes(item.name));
}

const TeamPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [activeTab, setActiveTab] = useState(TEAM_TABS['All']);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee>({
    id: '',
    name: '',
    type: '',
    linkedin: '',
    certification: '',
    funFact: '',
    description: '',
    photo: { name: '', url: '' },
    position: [''],
    degree: [''],
  });

  const router = useRouter();

  useEffect(() => {
    const tag = getQueryParam(router, 'tag');
    setActiveTab(tag ? toCamelCase(tag, '_', ' ') : 'All');
  }, [router]);

  const handleChangeTab = (selectedTab: string) => {
    // set Active Tab
    setActiveTab(selectedTab);

    // convert selectedTab to string that is compatible with query
    const selectedTabSubPath = replaceCharacterWith(
      selectedTab,
      ' ',
      '_',
    ).toLowerCase();

    // replace query with the selected tab key
    updateQueryParam(router, 'tag', selectedTabSubPath);
  };

  async function fetchData() {
    setLoading(true);
    await getAllEmployees()
      .then((data) => {
        const filteredData = filterArrayByNames(data, filterList);
        setEmployees(filteredData);
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    fetchData();
  }, []);

  const clearSelectedEmployee = () => {
    setSelectedEmployee({
      id: '',
      name: '',
      type: '',
      linkedin: '',
      certification: '',
      funFact: '',
      description: '',
      photo: { name: '', url: '' },
      position: [''],
      degree: [''],
    });
  };

  return (
    <>
      <CustomHead
        title="Team | ParallelChain Lab"
        content="The People Behind ParallelChain Lab. An expert team of software engineers and data scientists in distributed systems and artificial intelligence, with over 100 years of experience."
        metaKeywords="XPLL Team, Blockchain Team, ParallelChain Team, Blockchain expert, AI expert, Research and Development, Professional, Software Development, Leadership, Experienced"
        metaTitle="Meet the Team at ParallelChain Lab"
      />
      {selectedEmployee?.name ? (
        <Box>
          <StickyHeader
            height={{
              xs: EMPLOYEE_SHORT_INFO_HEIGHT,
              md: EMPLOYEE_SHORT_INFO_HEIGHT,
            }}
            onCloseModal={clearSelectedEmployee}
          >
            <TeamShortInfo selectedEmployee={selectedEmployee} />
          </StickyHeader>
          <EmployeeInfoModal employee={selectedEmployee} />
        </Box>
      ) : (
        <ContentBox
          noBorderBottom
          verticalContent={
            <TeamTabs activeTab={activeTab} onChangeTab={handleChangeTab} />
          }
          mainContent={
            <Box height="fit-content">
              <TeamHero />
              {loading ? (
                <Loading />
              ) : (
                <TeamGrid
                  employees={employees}
                  activeTab={activeTab}
                  onSelect={setSelectedEmployee}
                  selectedEmployeeId={selectedEmployee?.id}
                />
              )}
            </Box>
          }
        />
      )}
    </>
  );
};

export default TeamPage;
