'use strict';

$(function() {

	var countGroups = 0;

	function addSampleGroup(target) {
		var countFields = 0;

		var $group =
			$('<fieldset>').appendTo( $(target));
		var $legend =
			$('<legend>').appendTo($group);
		var $fieldsContainer =
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
			$('<label>Checkbox <input type="radio" checked name="selectType"></label>')
				.appendTo($legend);
		var $checkIcons =
			$('<label>Иконки <input type="checkbox" name="with-icons"></label>')
				.appendTo($legend);
		var $btnSaveField =
			$('<button class="btn-save">Сохранить группу</button>')
				.on('click', function () {
					var group = {
						name:  $groupName.children('input').val(),
						radio: $radRadio.children('input').is(":checked"),
						checkbox: $radCheckbox.children('input').is(":checked"),
						icons: $checkIcons.children('input').is(":checked"),
						fields: $fieldsContainer.find('input'),
						hasEmptyFields: function () {
							var has;
							group.fields.each(function(indx, elem) {
								has = $(elem).val() === null || $(elem).val().trim() === '';
							});
							return has
						}
					};

					if (group.name === null || group.name.trim() === '') {
						return
					} else if (group.hasEmptyFields()) {
						return
					}

					$legend.text(group.name).addClass('ready');
					$btnAddF.remove();

					if (group.radio) {
						(function () {
							var idName = 'id' + (new Date().getTime());
							if (group.fields.length === 1) {
								$(group.fields[0])
									.parent('label')
									.text(group.fields[0].value)
									.append('<input type="radio" checked name="' + idName + '" style=" display: none">')
							}

							for( var i = 0; i < group.fields.length; i++ ) {
								$(group.fields[i])
									.parent('label')
									.text(group.fields[i].value)
									.append('<input type="radio" name="' + idName + '">')
							}
						})()
					}
					if (group.checkbox) {
						(function () {
							var idName = 'id' + (new Date().getTime());
							for( var i = 0; i < group.fields.length; i++ ) {
								$(group.fields[i])
									.parent('label')
									.text(group.fields[i].value)
									.append('<input type="checkbox" name="' + idName + '">')
							}
						})()
					}
					$group.find('[type=checkbox], [type=radio]').checkboxradio({
						icon: group.icons
					});
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
				.appendTo($fieldsContainer);
			countFields++
		}

// ==================== jQueryUI ====================
		$group.find('[type=checkbox], [type=radio]').checkboxradio();
		$group.find('button.btn-save').button({
			icon: "ui-icon-check",
			showLabel: false
		});
		$group.find('button.btn-add-new-f').button({
			icon: "ui-icon-plusthick",
			showLabel: false
		});
		$group.find('button.btn-add-new-g').button({
			icon: "ui-icon-plusthick",
			showLabel: false
		});
		$group.find('[name=selType]').selectmenu();

		countGroups++;
	}

	addSampleGroup('main');

});

