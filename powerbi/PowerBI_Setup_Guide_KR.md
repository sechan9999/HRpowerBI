# Power BI Free 버전으로 HR 대시보드 만들기

## 📁 필요한 파일
- `HR_Employee_Data.csv` - 직원 데이터 파일

---

## 🚀 Step 1: Power BI Desktop 설치

1. [Power BI Desktop 다운로드](https://powerbi.microsoft.com/ko-kr/desktop/)
2. 무료 버전 설치 (Microsoft Store 또는 직접 다운로드)

---

## 📊 Step 2: 데이터 가져오기

1. Power BI Desktop 실행
2. **홈** → **데이터 가져오기** → **텍스트/CSV** 클릭
3. `HR_Employee_Data.csv` 파일 선택
4. **로드** 클릭

---

## 📈 Step 3: 대시보드 시각화 만들기

### 1️⃣ KPI 카드 (Active Headcount)
1. **시각화** 패널에서 **카드** 선택
2. **필드**에서 `EmployeeID`를 **값**으로 드래그
3. 필터: `Status` = "Active"
4. 제목: "Active Headcount"

### 2️⃣ 부서별 직원 수 (도넛 차트)
1. **시각화** → **도넛 차트** 선택
2. **범례**: `Department`
3. **값**: `EmployeeID` (개수)

### 3️⃣ 상태별 직원 분포 (파이 차트)
1. **시각화** → **원형 차트** 선택
2. **범례**: `Status`
3. **값**: `EmployeeID` (개수)

### 4️⃣ 부서별 평균 급여 (막대 차트)
1. **시각화** → **묶은 가로 막대형 차트** 선택
2. **Y축**: `Department`
3. **X축**: `Salary` (평균)

### 5️⃣ 입사 추이 (꺾은선 차트)
1. **시각화** → **꺾은선형 차트** 선택
2. **X축**: `StartDate` (월별)
3. **Y축**: `EmployeeID` (개수)

### 6️⃣ 직원 테이블
1. **시각화** → **테이블** 선택
2. **값**: `EmployeeID`, `Name`, `Department`, `Position`, `Status`, `Performance`

### 7️⃣ 성별 분포 (도넛 차트)
1. **시각화** → **도넛 차트** 선택
2. **범례**: `Gender`
3. **값**: `EmployeeID` (개수)

### 8️⃣ 위치별 분포 (막대 차트)
1. **시각화** → **묶은 세로 막대형 차트** 선택
2. **X축**: `Location`
3. **Y축**: `EmployeeID` (개수)

---

## 🎨 Step 4: 디자인 꾸미기

### 테마 설정
1. **보기** → **테마** → **어두운 테마** 선택 (웹앱과 비슷하게)

### 색상 커스텀
- 파란색 강조: `#3B82F6`
- 배경: `#1E293B`
- 카드 배경: `#334155`

### 슬라이서 추가 (필터)
1. **시각화** → **슬라이서** 선택
2. 추가할 필드: `Department`, `Status`, `Location`

---

## 📱 Step 5: 대시보드 레이아웃

```
┌─────────────────────────────────────────────────────────┐
│  [Active]  [Terminated]  [New Hires]  [Avg Salary]     │  ← KPI 카드들
├─────────────────────────────────────────────────────────┤
│  [부서별 차트]          │  [상태별 파이차트]            │
├─────────────────────────────────────────────────────────┤
│  [입사 추이 라인차트]                                   │
├─────────────────────────────────────────────────────────┤
│  [직원 테이블]                                          │
└─────────────────────────────────────────────────────────┘
```

---

## 📤 Step 6: 저장 및 공유

### Power BI Free 제한사항
- ❌ 웹에 게시 불가
- ❌ 다른 사용자와 공유 불가
- ✅ .pbix 파일로 저장 가능
- ✅ PDF로 내보내기 가능

### 저장하기
1. **파일** → **다른 이름으로 저장**
2. `HR_Dashboard.pbix`로 저장

### PDF 내보내기
1. **파일** → **내보내기** → **PDF**

---

## 💡 추가 팁

### DAX 측정값 만들기

```dax
// Active 직원 수
Active Employees = CALCULATE(COUNTROWS('HR_Employee_Data'), 'HR_Employee_Data'[Status] = "Active")

// 이직률
Turnover Rate =
DIVIDE(
    CALCULATE(COUNTROWS('HR_Employee_Data'), 'HR_Employee_Data'[Status] = "Terminated"),
    COUNTROWS('HR_Employee_Data')
) * 100

// 평균 근속연수
Avg Tenure =
AVERAGEX(
    FILTER('HR_Employee_Data', 'HR_Employee_Data'[Status] = "Active"),
    DATEDIFF('HR_Employee_Data'[StartDate], TODAY(), YEAR)
)

// 신규 입사자 (올해)
New Hires This Year =
CALCULATE(
    COUNTROWS('HR_Employee_Data'),
    YEAR('HR_Employee_Data'[StartDate]) = YEAR(TODAY())
)
```

---

## 🔗 참고 링크

- [Power BI 공식 문서](https://docs.microsoft.com/ko-kr/power-bi/)
- [Power BI 커뮤니티](https://community.powerbi.com/)
- [DAX 가이드](https://dax.guide/)

---

## ❓ 문의

GitHub Issues: https://github.com/sechan9999/HRpowerBI/issues
