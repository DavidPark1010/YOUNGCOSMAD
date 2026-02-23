function Dashboard({ t, stats, inquiries, formatDate, onGoToInquiries, onSelectInquiry }) {
  return (
    <>
      <div className="admin-summary">
        <div className="summary-card">
          <span className="summary-label">{t.dashboard.newToday}</span>
          <span className="summary-value">{stats.new}</span>
        </div>
        <div className="summary-card highlight">
          <span className="summary-label">{t.dashboard.unanswered}</span>
          <span className="summary-value">{inquiries.filter(i => i.status !== 'responded').length}</span>
        </div>
        <div className="summary-card">
          <span className="summary-label">{t.dashboard.thisWeek}</span>
          <span className="summary-value">{stats.total}</span>
        </div>
      </div>

      <div className="dashboard-section">
        <h3 className="dashboard-section-title">{t.dashboard.recentInquiries}</h3>
        {inquiries.length > 0 ? (
          <div className="dashboard-list">
            {inquiries.slice(0, 3).map(inq => (
              <div
                key={inq.id}
                className="dashboard-list-item"
                onClick={() => onSelectInquiry(inq)}
              >
                <img src={inq.productImage} alt="" className="dashboard-item-thumb" />
                <div className="dashboard-item-info">
                  <span className="dashboard-item-name">{inq.productName}</span>
                  <span className="dashboard-item-time">{formatDate(inq.timestamp)}</span>
                </div>
                <span className={`status-badge ${inq.status}`}>{t.status[inq.status]}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="dashboard-empty">{t.dashboard.noInquiries}</p>
        )}
        <button className="dashboard-cta" onClick={onGoToInquiries}>
          {t.dashboard.goToInquiries} →
        </button>
      </div>
    </>
  )
}

export default Dashboard
