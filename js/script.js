'use strict';

$(function() {

	var countGroups = 0;

	function addSampleGroup(target) {
		var countFields = 0;

		var $group =
			$('<fieldset>').appendTo( $(target));
		var $legend =
			$('<legend>').appendTo($group);
		var $fieldContainer =
			$('<div>').addClass('field-container').appendTo($group);
		var $elemName;
		addElemInp();

		var $groupName =
			$('<label>')
				.append('<input class="inp-name-group" type="text" maxlength="30" placeholder="Название группы">')
				.appendTo($legend);
		var $radRadio =
			$('<label>Radio <input type="radio" name="selectType"></label>')
				.appendTo($legend);
		var $radCheckbox =
			$('<label>Checkbox <input type="radio" name="selectType"></label>')
				.appendTo($legend);
		var $checkIcons =
			$('<label>Иконки <input type="checkbox" name="with-icons"></label>')
				.appendTo($legend);
		var $btnSaveField =
			$('<button class="btn-save">Сохранить группу</button>')
				.on('click', function () {
					var groupName = $('.inp-name-group').val();
					if (groupName === null || groupName === '' || groupName.trim() === '') {
						return
					}
					$legend.text(groupName)
				})
				.appendTo($legend);
		var $btnAddF =
			$('<button class="btn-add-new-f">Добавить новое поле</button>')
				.on('click', function () {
					if (countFields > 9) return;
					addElemInp();
				})
				.appendTo($group);

		function addElemInp() {
			$elemName = $('<label><input class="inp-name-elem" type="text" maxlength="30" placeholder="Название элемента"></label>')
				.appendTo($fieldContainer);
			countFields++
		}

// ==================== jQueryUI ====================
		function addUserInterfase() {
			$('[type=checkbox], [type=radio]').checkboxradio();
			$('button.btn-save').button({
				icon: "ui-icon-check",
				showLabel: false
			});
			$('button.btn-add-new-f').button({
				icon: "ui-icon-plusthick",
				showLabel: false
			});
			$('button.btn-add-new-g').button({
				icon: "ui-icon-plusthick",
				showLabel: false
			});
			$('[name=selType]').selectmenu();
		}
		addUserInterfase();
		countGroups++;
	}

	addSampleGroup('main');

});

