function Settings({ settings, setSettings, aiPolicy, setAiPolicy, settingsSaved, onSave }) {
  return (
    <div className="settings-page-simple">

      {/* 카드 1: 가격 문의시 연락 방법 설정 */}
      <div className="settings-card">
        <div className="settings-card-header">
          <h3 className="settings-card-title">가격 문의시 연락 방법 설정</h3>
          <p className="settings-card-desc">
            바이어가 정확한 가격을 문의하면, 영업팀이 직접 연락드립니다.<br />
            바이어에게 연락 방법을 요청할 때 보여줄 메시지와 연락 방법을 설정하세요.
          </p>
        </div>
        <div className="settings-card-body">
          <label className="simple-label">바이어에게 보여줄 메시지</label>
          <textarea
            className="simple-textarea"
            value={settings.priceInquiryMessage}
            onChange={e => setSettings({ ...settings, priceInquiryMessage: e.target.value })}
            rows={3}
            placeholder="예: 정확한 가격은 저희 영업팀에서 직접 연락드려 안내해드리겠습니다.&#10;연락 받으실 수 있는 방법을 알려주세요!"
          />
          <div className="simple-divider"></div>
          <label className="simple-label">바이어가 선택할 수 있는 연락 방법</label>
          <div className="simple-tag-list">
            {settings.contactMethods.map(method => (
              <span key={method.id} className="simple-tag">
                {method.name}
                <button
                  type="button"
                  className="simple-tag-remove"
                  onClick={() => setSettings({
                    ...settings,
                    contactMethods: settings.contactMethods.filter(m => m.id !== method.id)
                  })}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <div className="simple-add-row">
            <input
              type="text"
              className="simple-input"
              placeholder="연락 방법 입력 (예: 카카오톡, Telegram)"
              onKeyDown={e => {
                if (e.key === 'Enter' && e.target.value.trim()) {
                  setSettings({
                    ...settings,
                    contactMethods: [
                      ...settings.contactMethods,
                      { id: Date.now(), name: e.target.value.trim(), enabled: true }
                    ]
                  })
                  e.target.value = ''
                }
              }}
            />
            <button
              type="button"
              className="simple-add-btn"
              onClick={e => {
                const input = e.target.previousElementSibling
                if (input.value.trim()) {
                  setSettings({
                    ...settings,
                    contactMethods: [
                      ...settings.contactMethods,
                      { id: Date.now(), name: input.value.trim(), enabled: true }
                    ]
                  })
                  input.value = ''
                }
              }}
            >
              추가
            </button>
          </div>
        </div>
      </div>

      {/* 카드 2: 가격표 요청 대응 */}
      <div className="settings-card">
        <div className="settings-card-header">
          <h3 className="settings-card-title">가격표 요청 대응 설정</h3>
          <p className="settings-card-desc">
            바이어가 전체 가격표를 요청할 때 공통으로 보낼 답변입니다.<br />
            예: "가격표 보내주세요", "전체 상품 가격 알고 싶어요" 등
          </p>
        </div>
        <div className="settings-card-body">
          <textarea
            className="simple-textarea"
            value={aiPolicy.priceListPolicy}
            onChange={e => setAiPolicy({ ...aiPolicy, priceListPolicy: e.target.value })}
            rows={5}
            placeholder="예: 전체 가격표는 공개하지 않습니다. 관심 있는 제품을 말씀해주시면 개별 견적을 보내드리겠습니다."
          />
        </div>
      </div>

      {/* 카드 3: 회사 신뢰 질문 대응 */}
      <div className="settings-card">
        <div className="settings-card-header">
          <h3 className="settings-card-title">회사 신뢰 질문 대응</h3>
          <p className="settings-card-desc">
            바이어가 회사 신뢰성에 대해 질문할 때 공통으로 보낼 답변입니다.<br />
            예: "믿을 수 있나요?", "어떻게 믿고 돈을 보내요?", "사기 아니에요?" 등
          </p>
        </div>
        <div className="settings-card-body">
          <textarea
            className="simple-textarea"
            value={aiPolicy.trustPolicy}
            onChange={e => setAiPolicy({ ...aiPolicy, trustPolicy: e.target.value })}
            rows={5}
            placeholder="예: Young Cosmed는 대한민국에 정식 등록된 법인입니다. 필요하시면 사업자등록증을 보내드릴 수 있습니다."
          />
        </div>
      </div>

      {/* 카드 4: 결제 방법 안내 */}
      <div className="settings-card">
        <div className="settings-card-header">
          <h3 className="settings-card-title">결제 방법 안내</h3>
          <p className="settings-card-desc">
            현재 가능한 결제 방법을 등록하세요.<br />
            등록된 방법만 바이어에게 안내됩니다.
          </p>
        </div>
        <div className="settings-card-body">
          <div className="simple-tag-list">
            {aiPolicy.paymentMethods.map(method => (
              <span key={method.id} className="simple-tag">
                {method.name}
                <button
                  type="button"
                  className="simple-tag-remove"
                  onClick={() => setAiPolicy({
                    ...aiPolicy,
                    paymentMethods: aiPolicy.paymentMethods.filter(m => m.id !== method.id)
                  })}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <div className="simple-add-row">
            <input
              type="text"
              className="simple-input"
              placeholder="결제 방법 입력 (예: PayPal)"
              onKeyDown={e => {
                if (e.key === 'Enter' && e.target.value.trim()) {
                  setAiPolicy({
                    ...aiPolicy,
                    paymentMethods: [
                      ...aiPolicy.paymentMethods,
                      { id: Date.now(), name: e.target.value.trim(), enabled: true }
                    ]
                  })
                  e.target.value = ''
                }
              }}
            />
            <button
              type="button"
              className="simple-add-btn"
              onClick={e => {
                const input = e.target.previousElementSibling
                if (input.value.trim()) {
                  setAiPolicy({
                    ...aiPolicy,
                    paymentMethods: [
                      ...aiPolicy.paymentMethods,
                      { id: Date.now(), name: input.value.trim(), enabled: true }
                    ]
                  })
                  input.value = ''
                }
              }}
            >
              추가
            </button>
          </div>
          <div className="simple-divider"></div>
          <label className="simple-label">결제 안내 문구</label>
          <textarea
            className="simple-textarea"
            value={aiPolicy.paymentGuideText}
            onChange={e => setAiPolicy({ ...aiPolicy, paymentGuideText: e.target.value })}
            rows={3}
            placeholder="예: 결제는 T/T 또는 Wire Transfer로 진행됩니다. 주문 확정 후 인보이스를 보내드립니다."
          />
        </div>
      </div>

      {/* 카드 5: 말투 설정 */}
      <div className="settings-card">
        <div className="settings-card-header">
          <h3 className="settings-card-title">말투 설정</h3>
          <p className="settings-card-desc">
            바이어에게 답변할 때 사용할 말투를 선택하세요.
          </p>
        </div>
        <div className="settings-card-body">
          <div className="simple-radio-group">
            {[
              { key: 'professional', title: '전문적인 말투', desc: '격식 있고 신뢰감 있는 비즈니스 톤' },
              { key: 'friendly', title: '친근한 말투', desc: '친절하고 부드러운 비즈니스 톤' },
              { key: 'sales', title: '적극적인 말투', desc: '설득력 있고 영업적인 톤' },
            ].map(tone => (
              <label key={tone.key} className={`simple-radio-option ${aiPolicy.responseTone === tone.key ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="responseTone"
                  value={tone.key}
                  checked={aiPolicy.responseTone === tone.key}
                  onChange={e => setAiPolicy({ ...aiPolicy, responseTone: e.target.value })}
                />
                <div className="simple-radio-content">
                  <span className="simple-radio-title">{tone.title}</span>
                  <span className="simple-radio-desc">{tone.desc}</span>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* 카드 6: 하면 안 되는 것 */}
      <div className="settings-card">
        <div className="settings-card-header">
          <h3 className="settings-card-title">절대 말하면 안 되는 것</h3>
          <p className="settings-card-desc">
            체크된 항목은 바이어에게 절대 말하지 않습니다.
          </p>
        </div>
        <div className="settings-card-body">
          <div className="simple-checkbox-group">
            {[
              { key: 'noRetailPrice', label: '소비자 가격 말하지 않기' },
              { key: 'noCompetitorComparison', label: '경쟁사 비교하지 않기' },
              { key: 'noMedicalGuidance', label: '의료 시술 방법 안내하지 않기' },
              { key: 'noLegalLiability', label: '법적 보증 약속하지 않기' },
            ].map(item => (
              <label key={item.key} className="simple-checkbox">
                <input
                  type="checkbox"
                  checked={aiPolicy.restrictions[item.key]}
                  onChange={e => setAiPolicy({
                    ...aiPolicy,
                    restrictions: { ...aiPolicy.restrictions, [item.key]: e.target.checked }
                  })}
                />
                <span className="simple-checkbox-text">{item.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* 카드 7: 회사 기본 정보 */}
      <div className="settings-card">
        <div className="settings-card-header">
          <h3 className="settings-card-title">회사 기본 정보</h3>
          <p className="settings-card-desc">회사를 소개할 때 사용할 기본 정보입니다.</p>
        </div>
        <div className="settings-card-body">
          <textarea
            className="simple-textarea"
            value={aiPolicy.globalSystemPrompt}
            onChange={e => setAiPolicy({ ...aiPolicy, globalSystemPrompt: e.target.value })}
            rows={5}
            placeholder="예: Young Cosmed는 서울에 본사를 둔 K-뷰티 B2B 전문 기업입니다. 모든 제품은 CE, FDA 인증을 보유하고 있습니다."
          />
        </div>
      </div>

      {/* 저장 버튼 */}
      <div className="settings-save-area">
        <button className="settings-save-btn-large" onClick={onSave}>
          {settingsSaved ? '저장되었습니다!' : '설정 저장하기'}
        </button>
      </div>
    </div>
  )
}

export default Settings
