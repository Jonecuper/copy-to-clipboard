document.querySelectorAll('.copy-btn').forEach((element) => {
  const icon = document.createElement('span');
  icon.className = 'copy-icon';
  icon.textContent = '📋';
  element.appendChild(icon);

  const tooltip = document.createElement('span');
  tooltip.className = 'tooltip';
  tooltip.textContent = 'Скопировано!';
  element.appendChild(tooltip);

  icon.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
 
    const textToCopy =  this.parentElement.dataset.copy !== undefined ? this.parentElement.dataset.copy : this.parentElement.childNodes[0].textContent.trim();
    const tooltip = this.nextElementSibling;

    const rect = element.getBoundingClientRect();
    const tooltipHeight = tooltip.offsetHeight || 20;
    const spaceAbove = rect.top;
    const spaceBelow = window.innerHeight - rect.bottom;

    if (spaceAbove < tooltipHeight + 5 && spaceBelow > tooltipHeight + 5) {
      tooltip.classList.remove('top');
      tooltip.classList.add('bottom');
    } else {
      tooltip.classList.remove('bottom');
      tooltip.classList.add('top');
    }

    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        tooltip.classList.add('show');
        setTimeout(() => {
          tooltip.classList.remove('show');
        }, 1000);
      })
      .catch((err) => {
        console.error('Ошибка при копировании: ', err);
      });
  });
});
