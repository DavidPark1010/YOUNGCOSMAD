import { useState, useEffect } from 'react'
import InquiryList from './InquiryList'
import InquiryDetail from './InquiryDetail'
import SettingsPage from '../settings/SettingsPage'
import SellerInfoTab from './SellerInfoTab'

const subTabs = [
  { id: 'inquiries', label: '문의 관리' },
  { id: 'aiSettings', label: 'AI 응답 설정' },
  { id: 'sellerInfo', label: '판매자 정보' }
]

function CSManagementPage({
  inquiries, inquiryStats, selectedInquiry, setSelectedInquiry,
  updateInquiryStatus, updateMemo, removeInquiry, refreshInquiries,
  settings, setSettings, aiPolicy, setAiPolicy, onSaveSettings, settingsSaved,
  sellerInfo, setSellerInfo, onSaveSellerInfo, sellerInfoSaved,
  formatDateShort
}) {
  const [activeTab, setActiveTab] = useState('inquiries')

  // 탭 전환 시 문의 목록으로 복귀
  useEffect(() => {
    if (activeTab !== 'inquiries') {
      setSelectedInquiry(null)
    }
  }, [activeTab, setSelectedInquiry])

  // 문의 관리 탭 진입 시 데이터 새로고침
  useEffect(() => {
    if (activeTab === 'inquiries') {
      refreshInquiries()
    }
  }, [activeTab, refreshInquiries])

  const handleDeleteInquiry = (id) => {
    if (window.confirm('이 문의를 삭제하시겠습니까?')) {
      removeInquiry(id)
    }
  }

  return (
    <div className="cs-management">
      {/* 서브 탭 네비게이션 */}
      <div className="cs-sub-tabs">
        {subTabs.map(tab => (
          <button
            key={tab.id}
            className={`cs-sub-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
            {tab.id === 'inquiries' && inquiryStats.new > 0 && (
              <span className="cs-tab-badge">{inquiryStats.new}</span>
            )}
          </button>
        ))}
      </div>

      {/* 문의 관리 탭 */}
      {activeTab === 'inquiries' && !selectedInquiry && (
        <InquiryList
          inquiries={inquiries}
          inquiryStats={inquiryStats}
          onSelectInquiry={setSelectedInquiry}
          onDeleteInquiry={handleDeleteInquiry}
          formatDateShort={formatDateShort}
        />
      )}

      {activeTab === 'inquiries' && selectedInquiry && (
        <InquiryDetail
          inquiry={selectedInquiry}
          onBack={() => setSelectedInquiry(null)}
          onUpdateStatus={updateInquiryStatus}
          onUpdateMemo={updateMemo}
        />
      )}

      {/* AI 응답 설정 탭 */}
      {activeTab === 'aiSettings' && (
        <SettingsPage
          settings={settings}
          setSettings={setSettings}
          aiPolicy={aiPolicy}
          setAiPolicy={setAiPolicy}
          onSave={onSaveSettings}
          settingsSaved={settingsSaved}
        />
      )}

      {/* 판매자 정보 탭 */}
      {activeTab === 'sellerInfo' && (
        <SellerInfoTab
          sellerInfo={sellerInfo}
          setSellerInfo={setSellerInfo}
          onSave={onSaveSellerInfo}
          saved={sellerInfoSaved}
        />
      )}
    </div>
  )
}

export default CSManagementPage
