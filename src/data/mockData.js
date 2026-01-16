
export const DEPARTMENTS = ['Engineering', 'Sales', 'Marketing', 'HR', 'Finance', 'Operations'];
export const POSITIONS = ['Intern', 'Associate', 'Senior Associate', 'Manager', 'Director', 'VP'];
export const STATUSES = ['Active', 'Terminated', 'On Leave'];

const NAMES_FIRST = ['John', 'Jane', 'Michael', 'Emily', 'David', 'Sarah', 'Robert', 'Jessica', 'William', 'Ashley'];
const NAMES_LAST = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

export const generateData = (count = 200) => {
    const data = [];
    for (let i = 0; i < count; i++) {
        const status = Math.random() > 0.85 ? 'Terminated' : (Math.random() > 0.95 ? 'On Leave' : 'Active');
        const startDate = randomDate(new Date(2020, 0, 1), new Date());
        let endDate = null;
        if (status === 'Terminated') {
            endDate = randomDate(startDate, new Date());
        }

        const dept = DEPARTMENTS[Math.floor(Math.random() * DEPARTMENTS.length)];
        // Salary base based on dept
        let salaryBase = 50000;
        if (dept === 'Engineering') salaryBase = 80000;
        if (dept === 'Sales') salaryBase = 60000;
        if (dept === 'Finance') salaryBase = 70000;

        // Position multiplier
        const posIndex = Math.floor(Math.random() * POSITIONS.length);
        const position = POSITIONS[posIndex];
        const salary = Math.floor(salaryBase * (1 + (posIndex * 0.4)) + (Math.random() * 10000));
        const age = 22 + posIndex * 3 + Math.floor(Math.random() * 20);

        data.push({
            id: `EMP-${1000 + i}`,
            name: `${NAMES_FIRST[Math.floor(Math.random() * NAMES_FIRST.length)]} ${NAMES_LAST[Math.floor(Math.random() * NAMES_LAST.length)]}`,
            department: dept,
            position: position,
            status: status,
            gender: Math.random() > 0.5 ? 'Male' : 'Female',
            age: age,
            salary: salary,
            startDate: startDate.toISOString().split('T')[0],
            endDate: endDate ? endDate.toISOString().split('T')[0] : null,
            performance: Math.floor(Math.random() * 5) + 1,
            location: Math.random() > 0.5 ? 'New York' : (Math.random() > 0.5 ? 'London' : 'Remote'),
        });
    }
    return data;
};

export const MOCK_DATA = generateData(300);
