import React, { useState, useMemo, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import type { DemoView, DateRange, Post, Creator, UTMLink } from '@/types/smdashboard';
import { getScaledData } from '@/data/mockSMData';

import Sidebar from './Sidebar';
import TopBar from './TopBar';
import RightPanel from './RightPanel';

import OverviewView from './views/OverviewView';
import CreatorsView from './views/CreatorsView';
import CreatorProfileView from './views/CreatorProfileView';
import ContentView from './views/ContentView';
import AttributionView from './views/AttributionView';
import LinksView from './views/LinksView';
import CreateLinkView from './views/CreateLinkView';

import PostDetailPanel from './panels/PostDetailPanel';
import CreatorDetailPanel from './panels/CreatorDetailPanel';
import UTMGeneratorPanel from './panels/UTMGeneratorPanel';
import SavedLinksPanel from './panels/SavedLinksPanel';
import InsightsPanel from './panels/InsightsPanel';

type PanelType = 'post' | 'creator' | 'utm' | 'savedLinks' | 'insights' | null;

// Deterministic sparkline data generator
function generateSparkData(seed: number, count: number): number[] {
  let s = seed | 0;
  const next = () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  const data: number[] = [];
  let val = 50 + next() * 50;
  for (let i = 0; i < count; i++) {
    val = val + (next() - 0.45) * 15;
    val = Math.max(10, Math.min(100, val));
    data.push(Math.round(val));
  }
  return data;
}

const DemoShell: React.FC = () => {
  const [activeView, setActiveView] = useState<DemoView>('overview');
  const [dateRange, setDateRange] = useState<DateRange>('30d');
  const [panelType, setPanelType] = useState<PanelType>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null);
  // Creator profile view: when a creator is "opened" from CreatorsView
  const [profileCreator, setProfileCreator] = useState<Creator | null>(null);

  // Session-level links (created links persist across view switches)
  const [sessionLinks, setSessionLinks] = useState<UTMLink[]>([]);

  const data = useMemo(() => getScaledData(dateRange), [dateRange]);

  // Merge mock links with session-created links
  const allLinks = useMemo(() => [...sessionLinks, ...data.utmLinks], [sessionLinks, data.utmLinks]);

  const handleLinkCreated = useCallback((link: UTMLink) => {
    setSessionLinks((prev) => [link, ...prev]);
  }, []);

  // Generate deterministic sparkline data per creator
  const creatorSparkData = useMemo(() => {
    const sparkCount = dateRange === '7d' ? 7 : dateRange === '90d' ? 30 : 14;
    const result: Record<string, number[]> = {};
    data.creators.forEach((c, i) => {
      result[c.id] = generateSparkData(42 + i * 100, sparkCount);
    });
    return result;
  }, [data.creators, dateRange]);

  const handlePostClick = useCallback((post: Post) => {
    setSelectedPost(post);
    setPanelType('post');
  }, []);

  const handleCreatorClick = useCallback((creator: Creator) => {
    // From CreatorsView: open profile view
    // From OverviewView: open panel
    if (activeView === 'creators') {
      setProfileCreator(creator);
    } else {
      setSelectedCreator(creator);
      setPanelType('creator');
    }
  }, [activeView]);

  const handleClosePanel = useCallback(() => {
    setPanelType(null);
    setSelectedPost(null);
    setSelectedCreator(null);
  }, []);

  const handleViewAllCreators = useCallback(() => {
    setProfileCreator(null);
    setActiveView('creators');
  }, []);

  const handleViewAllPosts = useCallback(() => {
    setActiveView('content');
  }, []);

  const handleCreateLink = useCallback(() => {
    setActiveView('createLink');
  }, []);

  const handleViewSavedLinks = useCallback(() => {
    setPanelType('savedLinks');
  }, []);

  const handleNavigateToAttribution = useCallback(() => {
    handleClosePanel();
    setActiveView('attribution');
  }, [handleClosePanel]);

  const handleBackFromProfile = useCallback(() => {
    setProfileCreator(null);
  }, []);

  // When switching views, clear profile
  const handleViewChange = useCallback((view: DemoView) => {
    setProfileCreator(null);
    setActiveView(view);
  }, []);

  // Panel title
  function getPanelTitle(): string {
    switch (panelType) {
      case 'post': return selectedPost ? 'Post Detail' : '';
      case 'creator': return selectedCreator ? selectedCreator.name : '';
      case 'utm': return 'Create Link';
      case 'savedLinks': return 'Saved Links';
      case 'insights': return 'AI Insights';
      default: return '';
    }
  }

  // Panel content
  function renderPanelContent(): React.ReactNode {
    switch (panelType) {
      case 'post':
        if (!selectedPost) return null;
        return (
          <PostDetailPanel
            post={selectedPost}
            creator={data.creators.find((c) => c.id === selectedPost.creatorId)}
            onNavigateToAttribution={handleNavigateToAttribution}
          />
        );
      case 'creator':
        if (!selectedCreator) return null;
        return (
          <CreatorDetailPanel
            creator={selectedCreator}
            posts={data.posts.filter((p) => p.creatorId === selectedCreator.id)}
            sparkData={creatorSparkData[selectedCreator.id] || []}
          />
        );
      case 'utm':
        return <UTMGeneratorPanel />;
      case 'savedLinks':
        return <SavedLinksPanel links={allLinks} />;
      case 'insights':
        return <InsightsPanel insights={data.insights} />;
      default:
        return null;
    }
  }

  // Determine if we're showing a creator profile inside the creators tab
  const showingCreatorProfile = activeView === 'creators' && profileCreator !== null;

  return (
    <div className="h-screen w-screen overflow-hidden grid grid-cols-[56px_1fr] bg-[#09090B]">
      {/* Left sidebar */}
      <Sidebar activeView={activeView} onViewChange={handleViewChange} />

      {/* Main area */}
      <div className="grid grid-rows-[48px_1fr] overflow-hidden">
        {/* Top bar */}
        <TopBar
          activeView={activeView}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
        />

        {/* Content area */}
        <div className="overflow-hidden">
          <AnimatePresence mode="wait">
            {activeView === 'overview' && (
              <OverviewView
                key="overview"
                data={data}
                onPostClick={handlePostClick}
                onCreatorClick={(creator) => {
                  setSelectedCreator(creator);
                  setPanelType('creator');
                }}
                onViewAllCreators={handleViewAllCreators}
                onViewAllPosts={handleViewAllPosts}
                creatorSparkData={creatorSparkData}
              />
            )}
            {activeView === 'creators' && !showingCreatorProfile && (
              <CreatorsView
                key="creators"
                creators={data.creators}
                onCreatorClick={handleCreatorClick}
                creatorSparkData={creatorSparkData}
              />
            )}
            {showingCreatorProfile && profileCreator && (
              <CreatorProfileView
                key={`creator-profile-${profileCreator.id}`}
                creator={profileCreator}
                posts={data.posts.filter((p) => p.creatorId === profileCreator.id)}
                sparkData={creatorSparkData[profileCreator.id] || []}
                onBack={handleBackFromProfile}
                onPostClick={handlePostClick}
              />
            )}
            {activeView === 'content' && (
              <ContentView
                key="content"
                posts={data.posts}
                creators={data.creators}
                onPostClick={handlePostClick}
              />
            )}
            {activeView === 'attribution' && (
              <AttributionView
                key="attribution"
                posts={data.posts}
                creators={data.creators}
              />
            )}
            {activeView === 'links' && (
              <LinksView
                key="links"
                links={allLinks}
                onCreateLink={handleCreateLink}
                onViewSavedLinks={handleViewSavedLinks}
              />
            )}
            {activeView === 'createLink' && (
              <CreateLinkView
                key="createLink"
                onBack={() => setActiveView('links')}
                onLinkCreated={handleLinkCreated}
              />
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Right panel */}
      <RightPanel
        open={panelType !== null}
        onClose={handleClosePanel}
        title={getPanelTitle()}
      >
        {renderPanelContent()}
      </RightPanel>
    </div>
  );
};

export default DemoShell;
