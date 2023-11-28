'use strict';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import Swiper, { Pagination, Autoplay, EffectFade } from 'swiper';
Swiper.use([Pagination, Autoplay, EffectFade]);

import '../css/app.scss';
import SmoothScroll from 'smooth-scroll';

(function (window, document, $) {
	// menu開閉 
	window.addEventListener('DOMContentLoaded', (event) => {
		$('.is-menu-btn').on('click', function () {
			$('body').toggleClass('is-active');
		});
		$('a[href^="#"]').on('click', function () {
			$('body').removeClass('is-active');
		});
	});

	// sticky化 #vantan-headerが画面外ならsticky
	const vantanHeader = document.querySelectorAll('#vantan-header');
	const vantanHeaderOptions = {
		root: null,
		rootMargin: '0px 0px 0px 0px',
		threshold: 0, 
	};
	const vantanHeaderObserver = new IntersectionObserver(
		vantanHeaderIntersectFunction,
		vantanHeaderOptions
	);
	vantanHeader.forEach((item) => {
		vantanHeaderObserver.observe(item);
	});
	function vantanHeaderIntersectFunction(elements) {
		elements.forEach((element) => {
			if (element.isIntersecting) {
				$('.sct-main .is-menu-btn').removeClass('js-sticky');
			} else {
				$('.sct-main .is-menu-btn').addClass('js-sticky');
			}
		});
	}

	//swiper
	const fvSwiper = new Swiper('.sct-main .swiper', {
		loop: true,
		slidesPerView: 1,
		speed: 1000,
		autoplay: {
			delay: 4000,
		},
		effect: 'fade',
		fadeEffect: {
			crossFade: true,
		},
		pagination: {
			el: '.sct-main .swiper-pagination',
			clickable: true,
		},
	});

	// smoothscroll
	var scroll = new SmoothScroll('a[href*="#"]', {
		speed: 100, //スクロールする速さ
		easing: 'easeInOutCubic',
	});

	//タブ切り替え
	$(function () {
		const e = document.getElementById('course_panel')!,
			t = document.querySelectorAll('[data-course_panel-btn]'),
			t2 = document.querySelectorAll('[data-course_panel-bottom_btn]');
		Array.from(t).forEach((t) => {
			const i = t.getAttribute('data-course_panel-btn'),
				bottom_btn = document.querySelector(
					`[data-course_panel-bottom_btn="${i}"]`
				)!,
				n = document.querySelector(`[data-course_panel="${i}"]`)!;
			t.addEventListener('click', () => {
				const i = e.querySelectorAll('.is-active');
				Array.from(i).forEach((e) => {
					e.classList.remove('is-active');
				}),
					t.classList.add('is-active'),
					bottom_btn.classList.add('is-active'),
					n.classList.add('is-active');
			});
		}),
			Array.from(t2).forEach((t2) => {
				const i = t2.getAttribute('data-course_panel-bottom_btn'),
					top_btn = document.querySelector(`[data-course_panel-btn="${i}"]`)!,
					n = document.querySelector(`[data-course_panel="${i}"]`)!;
				t2.addEventListener('click', () => {
					const i = e.querySelectorAll('.is-active');
					Array.from(i).forEach((e) => {
						e.classList.remove('is-active');
					}),
						t2.classList.add('is-active'),
						top_btn.classList.add('is-active'),
						n.classList.add('is-active');
				});
			});
	});

	//Q&A アニメーション設定
	const animTiming = {
		duration: 100,
		easing: 'ease-out',
	};
	const closingAnimKeyframes = (content) => [
		{
			height: content.offsetHeight + 'px', // height: "auto"だとうまく計算されないため要素の高さを指定する
			opacity: 1,
		},
		{
			height: 0,
			opacity: 0,
		},
	];
	const openingAnimKeyframes = (content) => [
		{
			height: 0,
			opacity: 0,
		},
		{
			height: content.offsetHeight + 'px',
			opacity: 1,
		},
	];

	const details =
		document.querySelectorAll<HTMLDetailsElement>('.js-accordion');
	const RUNNING_VALUE = 'running'; // アニメーション実行中のときに付与する予定のカスタムデータ属性の値
	const IS_OPENED_CLASS = 'is-opened'; // アイコン操作用のクラス名

	details.forEach((element) => {
		const summary = element.querySelector('.js-click_open')!;
		const content = element.querySelector('.js-accordion_content')!;

		summary.addEventListener('click', (event) => {
			// デフォルトの挙動を無効化
			event.preventDefault();

			// 連打防止用。アニメーション中だったらクリックイベントを受け付けないでリターンする
			if (element.dataset.animStatus === RUNNING_VALUE) {
				return;
			}

			// detailsのopen属性を判定
			if (element.open) {
				// アコーディオンを閉じるときの処理
				element.classList.toggle(IS_OPENED_CLASS);
				// アニメーションを実行
				const closingAnim = content.animate(
					closingAnimKeyframes(content),
					animTiming
				);
				element.dataset.animStatus = RUNNING_VALUE;

				// アニメーションの完了後に
				closingAnim.onfinish = () => {
					element.removeAttribute('open');
					element.dataset.animStatus = '';
				};
			} else {
				// アコーディオンを開くときの処理
				element.setAttribute('open', 'true');
				element.classList.toggle(IS_OPENED_CLASS);

				// アニメーションを実行
				const openingAnim = content.animate(
					openingAnimKeyframes(content),
					animTiming
				);
				element.dataset.animStatus = RUNNING_VALUE;
				openingAnim.onfinish = () => {
					element.dataset.animStatus = '';
				};
			}
		});
	});

	// access toggle 切り替え
	const e = document.getElementById('panel')!,
		t = document.querySelectorAll('[data-panel-btn]');
	Array.from(t).forEach((t) => {
		const i = t.getAttribute('data-panel-btn'),
			n = document.querySelector(`[data-panel="${i}"]`)!;
		t.addEventListener('click', () => {
			const i = e.querySelectorAll('.is-active');
			Array.from(i).forEach((e) => {
				e.classList.remove('is-active');
			}),
				t.classList.add('is-active'),
				n.classList.add('is-active');
		});
	});

	//画面固定のcvボタンの表示非表示切り替え (交差API
	// .sct-main内のcv_btnが表示されているときと.sct-documentが表示されているときは固定cvボタンを非表示
	const sectionDocument = document.querySelectorAll('.sct-document');
	const sectionMainBtn = document.querySelectorAll('.sct-main .a-cv_btn_wrap');
	//.sct-documentが1px、ビューポートの中にはいったら発火
	const sectionDocumentOptions = {
		root: null, // ビューポートはウィンドウ全体
		rootMargin: '0px 0px 0px 0px',
		threshold: 0, // 1ピクセルでも表示されるとコールバックが実行
	};
	const sectionMainBtnOptions = {
		root: null,
		rootMargin: '0px 0px 500px 0px', //FV内にcvbtnが出ていない実機を考慮し下方向の監視範囲を広げる
		threshold: 0,
	};

	function IntersectFunction2(elements) {
		// 交差監視をしたもののなかで、isIntersectingがtrueになったとき
		elements.forEach((element) => {
			if (element.isIntersecting) {
				$('body').removeClass('js-elementShow');
			} else {
				$('body').addClass('js-addAnim');
				$('body').addClass('js-elementShow');
			}
		});
	}
	const observer = new IntersectionObserver(
		IntersectFunction,
		sectionDocumentOptions
	);
	sectionDocument.forEach((item) => {
		observer.observe(item);
	});
	function IntersectFunction(elements) {
		// 交差監視をしたもののなかで、isIntersectingがtrueになったとき
		elements.forEach((element) => {
			if (element.isIntersecting) {
				$('body').removeClass('js-elementShow');
			} else {
				const observer2 = new IntersectionObserver(
					IntersectFunction2,
					sectionMainBtnOptions
				);
				sectionMainBtn.forEach((item) => {
					observer2.observe(item);
				});
			}
		});
	}
})(window, document, jQuery);
