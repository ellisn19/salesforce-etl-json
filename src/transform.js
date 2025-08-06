// src/transform.js

function transformRecord(record) {
	return {
		fullName: `${record.FirstName || ''} ${record.LastName || ''}`.trim(),
		email: record.Email || null,
		createdAt: record.CreatedDate
			? new Date(record.CreatedDate).toISOString()
			: null,
		phone: record.Phone || null,
		isActive: record.IsActive === 'true' || record.IsActive === true,
	};
}

module.exports = {
	transformRecord,
};
