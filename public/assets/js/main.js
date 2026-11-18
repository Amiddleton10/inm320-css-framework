// ==========================================================
// INM320 CSS Framework: Purity UI Dashboard
// 1. Sales overview line chart (chart.js)
// 2. Active users bar chart (chart.js)
// 3. "Add a project" modal form (bootstrap modal)
// 4. Footer year
// ==========================================================


// ---------- shared chart settings ----------
const blood = '#c0392b';
const bone = '#ece3d9';
const axisGrey = '#968b88';   // muted axis labels
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


// ---------- 1. sales overview line chart ----------
const salesCanvas = document.querySelector('#sales-chart');

if (salesCanvas && typeof Chart !== 'undefined') {
    // red gradient that fades out towards the bottom of the chart
    const salesContext = salesCanvas.getContext('2d');
    const bloodFill = salesContext.createLinearGradient(0, 0, 0, 300);
    bloodFill.addColorStop(0, 'rgba(192, 57, 43, 0.55)');
    bloodFill.addColorStop(1, 'rgba(192, 57, 43, 0)');

    new Chart(salesCanvas, {
        type: 'line',
        data: {
            labels: months,
            datasets: [
                {
                    label: 'Mobile apps',
                    data: [180, 230, 210, 350, 360, 470, 400, 300, 360, 220, 400, 430],
                    borderColor: blood,
                    backgroundColor: bloodFill,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 0
                },
                {
                    label: 'Websites',
                    data: [500, 170, 180, 270, 210, 250, 230, 160, 110, 150, 160, 130],
                    borderColor: bone,
                    backgroundColor: 'rgba(236, 227, 217, 0.06)',
                    fill: true,
                    tension: 0.4,
                    pointRadius: 0
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,   // lets the chart fill the .chart-wrap height
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: {
                    grid: { display: false },
                    border: { display: false },
                    ticks: { color: axisGrey, font: { size: 10 } }
                },
                y: {
                    beginAtZero: true,
                    max: 500,
                    ticks: { color: axisGrey, stepSize: 100, font: { size: 10 } },
                    grid: { color: '#2e252a' },
                    border: { display: false, dash: [5, 5] }   // dashed grid lines
                }
            }
        }
    });
}


// ---------- 2. active users bar chart (white bars on the dark box) ----------
const usersCanvas = document.querySelector('#users-chart');

if (usersCanvas && typeof Chart !== 'undefined') {
    new Chart(usersCanvas, {
        type: 'bar',
        data: {
            labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
            datasets: [
                {
                    label: 'Active users',
                    data: [330, 240, 110, 290, 490, 400, 480, 290, 170],
                    backgroundColor: bone,
                    borderRadius: 4,
                    barThickness: 7
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: { display: false },
                y: {
                    beginAtZero: true,
                    max: 500,
                    ticks: { color: bone, stepSize: 100, font: { size: 10, weight: 'bold' } },
                    grid: { display: false },
                    border: { display: false }
                }
            }
        }
    });
}


// ---------- 3. "add a project" modal form ----------
const projectForm = document.querySelector('#project-form');
const completionInput = document.querySelector('#project-completion');
const completionOutput = document.querySelector('#completion-output');

// show the slider value next to the "completion" label as it moves
completionInput.addEventListener('input', function () {
    completionOutput.textContent = completionInput.value;
});

projectForm.addEventListener('submit', function (event) {
    event.preventDefault();

    // use bootstrap's built-in validation styles if a required field is empty
    if (!projectForm.checkValidity()) {
        projectForm.classList.add('was-validated');
        return;
    }

    const name = document.querySelector('#project-name').value.trim();
    const budget = Number(document.querySelector('#project-budget').value).toLocaleString('en-CA');
    const completion = completionInput.value;

    // build a new table row that matches the existing rows
    const row = document.createElement('tr');

    const companyCell = document.createElement('td');
    companyCell.innerHTML = '<span class="company-logo"><i class="bi bi-star-fill" aria-hidden="true"></i></span> ';
    companyCell.append(name);

    // data-label attributes give each cell its label in the stacked phone layout
    const membersCell = document.createElement('td');
    membersCell.dataset.label = 'Members';
    membersCell.innerHTML = '<div class="avatars" role="img" aria-label="1 member"><span class="avatar avatar-2"></span></div>';

    const budgetCell = document.createElement('td');
    budgetCell.className = 'fw-bold';
    budgetCell.dataset.label = 'Budget';
    budgetCell.textContent = '$' + budget;

    const completionCell = document.createElement('td');
    completionCell.dataset.label = 'Completion';
    completionCell.innerHTML =
        '<div class="completion-cell">' +
        '<span class="completion">' + completion + '%</span>' +
        '<div class="progress progress-thin" role="progressbar" aria-valuenow="' + completion + '" aria-valuemin="0" aria-valuemax="100">' +
        '<div class="progress-bar w-' + completion + '"></div></div>' +
        '</div>';
    completionCell.querySelector('.progress').setAttribute('aria-label', name + ' completion');

    row.append(companyCell, membersCell, budgetCell, completionCell);
    document.querySelector('#projects-body').prepend(row);

    // close the modal and reset the form for next time
    bootstrap.Modal.getInstance(document.querySelector('#project-modal')).hide();
    projectForm.reset();
    projectForm.classList.remove('was-validated');
    completionOutput.textContent = completionInput.value;
});


// ---------- 4. footer year ----------
document.querySelector('#year').textContent = new Date().getFullYear();
