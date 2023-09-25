const decorationImages = document.querySelectorAll('.decoration')

// Get data from json
let data = null

const getDataFromJson = async function () {
	const response = fetch('./data/data.json')
	const responseParse = (await response).json()

	data = await responseParse
}

getDataFromJson()

document.addEventListener('DOMContentLoaded', async () => {
	// Устранение проблемы с отображением декоративных элементов
	window.addEventListener('resize', () => {
		decorationImages.forEach((decoration) => {
			if (window.innerWidth < 1600) {
				decoration.style.display = 'none'
			} else {
				decoration.style.display = 'block'
			}
		})
	})

	// Fullpage Lib
	const fullpage_api = new fullpage('#fullpage', {
		menu: '#menu',
		normalScrollElements: '.modal',
		anchors: [
			'intro',
			'atmosphere',
			'exosphere',
			'thermosphere',
			'mesosphere',
			'stratosphere',
			'troposphere',
			'interesting',
		],
		afterLoad: function (origin, destination, direction, trigger) {
			const sectionIndex = destination.index
			const modalNextButton = document.querySelector(
				'.modal-content__text .next-sphere'
			)
			const statistics = document.querySelectorAll('.statistic')
			const troposphereDescription = document.querySelector(
				'.troposphere-description'
			)

			if (sectionIndex != 6) {
				troposphereDescription.classList.remove('dark')
				statistics[4].classList.remove('dark')
			}

			if (sectionIndex == 6) {
				modalNextButton.style.display = 'none'
			} else {
				modalNextButton.style.display = 'inline-block'
			}
		},
		beforeLeave: function (origin, destination, direction, trigger) {
			const sectionIndex = destination.index
			const nav = document.querySelector('aside ul')
			const navItem = document.querySelectorAll('aside ul li')
			const navLinks = document.querySelectorAll('aside ul li a')
			const troposphereDescription = document.querySelector(
				'.troposphere-description'
			)
			const statistics = document.querySelectorAll('.statistic')

			if (sectionIndex == 6) {
				troposphereDescription.classList.add('dark')
				statistics[4].classList.add('dark')
			}

			if (sectionIndex == 6 || sectionIndex == 7) {
				navLinks.forEach((link) => {
					link.classList.add('dark')
					link.classList.remove('light')
				})
			} else {
				navLinks.forEach((link) => {
					link.classList.add('light')
					link.classList.remove('dark')
				})
			}

			if (sectionIndex != 0) {
				nav.style.marginBottom = '50%'
				navItem[navItem.length - 1].classList.add('show')
				navItem[0].classList.add('show')
			} else {
				nav.style.marginBottom = '0'
				navItem[navItem.length - 1].classList.remove('show')
				navItem[0].classList.remove('show')
			}
		},
	})

	// Read more button / Modal window
	const readMoreLink = document.querySelectorAll('.gradient-link')
	const modal = document.querySelector('.modal')
	const closeModalButton = document.querySelector('.modal-close')
	const mobileModalCloseButton = document.querySelector(
		'.progress-bar .close'
	)
	const nextSphere = document.querySelector('.next-sphere')
	const modalTextContanier = document.querySelector(
		'.modal-content__description'
	)

	const setModalData = (obj) => {
		const paragraphs = obj.description.split('\n')

		paragraphs.forEach((paragraph) => {
			const p = document.createElement('p')
			p.textContent = paragraph
			modalTextContanier.appendChild(p)
		})

		document.querySelector('.progress-bar h3').innerHTML = obj.title
		document
			.querySelector('.modal-content__text .next-sphere')
			.setAttribute('href', `${obj.href}`)
		// document
		// 	.querySelector('.modal-content__text img')
		// 	.setAttribute('src', `${obj.image}`)
	}

	if (readMoreLink) {
		readMoreLink.forEach((link) => {
			link.addEventListener('click', (e) => {
				e.preventDefault()
				modalContentText.scrollTo(0, 0)

				const linkId = +link.querySelector('.link-id')?.value

				if (linkId) {
					const currentLinkData = data.find(
						(item) => item.id === linkId
					)
					setModalData(currentLinkData)
				}

				modal.classList.toggle('show')
			})
		})

		document.addEventListener('keydown', (e) => {
			if (e.key === 'Escape') {
				modal.classList.remove('show')
				fullpage_api.setAllowScrolling(true)
				fullpage_api.setKeyboardScrolling(true)
				setTimeout(() => {
					modalTextContanier.innerHTML = ''
				}, 500)
			}
		})

		if (nextSphere) {
			nextSphere.addEventListener('click', () => {
				modal.classList.remove('show')
				setTimeout(() => {
					modalTextContanier.innerHTML = ''
				}, 500)
			})
		}
	}

	if (mobileModalCloseButton) {
		mobileModalCloseButton.addEventListener('click', () => {
			modal.classList.remove('show')
			fullpage_api.setAllowScrolling(true)
			fullpage_api.setKeyboardScrolling(true)
			setTimeout(() => {
				modalTextContanier.innerHTML = ''
			}, 500)
		})
	}

	if (closeModalButton) {
		closeModalButton.addEventListener('click', () => {
			modal.classList.remove('show')
			fullpage_api.setAllowScrolling(true)
			fullpage_api.setKeyboardScrolling(true)
			setTimeout(() => {
				modalTextContanier.innerHTML = ''
			}, 500)
		})
	}

	// Hamburger button / mobile menu
	const hamburger = document.querySelector('.hamburger')
	const headerButton = document.querySelector('.header-button')
	const mobileMenu = document.querySelector('.mobile')
	const mobileLinks = document.querySelectorAll('.mobile-list li a')

	if (hamburger) {
		headerButton.addEventListener('click', () => {
			mobileMenu.classList.toggle('show')
			hamburger.classList.toggle('active')
		})
	}

	if (mobileLinks) {
		mobileLinks.forEach((link) => {
			link.addEventListener('click', () => {
				mobileMenu.classList.remove('show')
				hamburger.classList.remove('active')
			})
		})
	}

	// Share button
	const shareButton = document.querySelector('.share')
	const shareIcon = document.querySelector('.share button .share-icon')
	const tickIcon = document.querySelector('.share button .tick-icon')

	let timer

	if (shareButton) {
		shareButton.addEventListener('click', () => {
			navigator.clipboard.writeText(window.location.href)

			shareIcon.classList.add('hide')
			tickIcon.classList.add('show')

			clearTimeout(timer)

			timer = setTimeout(() => {
				shareIcon.classList.remove('hide')
				tickIcon.classList.remove('show')
			}, 2000)
		})
	}

	// Modal progress bar
	const modalContentText = document.querySelector('.modal-content__text')
	const progressBar = document.querySelector('.progress-bar .line')

	if (modalContentText) {
		modalContentText.addEventListener('scroll', function () {
			const contentHeight =
				modalContentText.scrollHeight - modalContentText.clientHeight
			const scrollPosition = modalContentText.scrollTop
			const progress = (scrollPosition / contentHeight) * 100

			progressBar.style.width = `${progress}%`
		})
	}
})
