function addAndRemoveAnimationClasses (id, time) {
  setTimeout(function () {
    document.getElementById(id).classList.add('fade-animation')
    document.getElementById(id).classList.remove('fade')
  }, time)
}

window.addEventListener('load', function () {
  addAndRemoveAnimationClasses('fade-1', 0)
  addAndRemoveAnimationClasses('fade-2', 2000)
  addAndRemoveAnimationClasses('fade-3', 1000)
})