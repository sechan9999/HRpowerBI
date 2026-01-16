// Power BI용 CSV 데이터 생성 스크립트
const fs = require('fs');

const DEPARTMENTS = ['Engineering', 'Sales', 'Marketing', 'HR', 'Finance', 'Operations'];
const POSITIONS = ['Intern', 'Associate', 'Senior Associate', 'Manager', 'Director', 'VP'];
const NAMES_FIRST = ['John', 'Jane', 'Michael', 'Emily', 'David', 'Sarah', 'Robert', 'Jessica', 'William', 'Ashley'];
const NAMES_LAST = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function generateData(count = 300) {
    const data = [];
    for (let i = 0; i < count; i++) {
        const status = Math.random() > 0.85 ? 'Terminated' : (Math.random() > 0.95 ? 'On Leave' : 'Active');
        const startDate = randomDate(new Date(2020, 0, 1), new Date());
        let endDate = null;
        if (status === 'Terminated') {
            endDate = randomDate(startDate, new Date());
        }

        const dept = DEPARTMENTS[Math.floor(Math.random() * DEPARTMENTS.length)];
        let salaryBase = 50000;
        if (dept === 'Engineering') salaryBase = 80000;
        if (dept === 'Sales') salaryBase = 60000;
        if (dept === 'Finance') salaryBase = 70000;

        const posIndex = Math.floor(Math.random() * POSITIONS.length);
        const position = POSITIONS[posIndex];
        const salary = Math.floor(salaryBase * (1 + (posIndex * 0.4)) + (Math.random() * 10000));
        const age = 22 + posIndex * 3 + Math.floor(Math.random() * 20);

        data.push({
            EmployeeID: `EMP-${1000 + i}`,
            Name: `${NAMES_FIRST[Math.floor(Math.random() * NAMES_FIRST.length)]} ${NAMES_LAST[Math.floor(Math.random() * NAMES_LAST.length)]}`,
            Department: dept,
            Position: position,
            Status: status,
            Gender: Math.random() > 0.5 ? 'Male' : 'Female',
            Age: age,
            Salary: salary,
            StartDate: startDate.toISOString().split('T')[0],
            EndDate: endDate ? endDate.toISOString().split('T')[0] : '',
            Performance: Math.floor(Math.random() * 5) + 1,
            Location: Math.random() > 0.5 ? 'New York' : (Math.random() > 0.5 ? 'London' : 'Remote'),
        });
    }
    return data;
}

// Generate CSV
const data = generateData(300);
const headers = Object.keys(data[0]).join(',');
const rows = data.map(row => Object.values(row).join(','));
const csv = [headers, ...rows].join('\n');

fs.writeFileSync('HR_Employee_Data.csv', csv);
console.log('CSV 파일이 생성되었습니다: HR_Employee_Data.csv');
