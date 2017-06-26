'use strict';

$(function() {

	var countGroups = 0;

	function addSampleGroup(target) {
		var countFields = 0;
		var idName = 'id' + (new Date().getTime());

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
				.append('<input class="inp-name-group" type="text" maxlength="50" placeholder="Название группы">')
				.appendTo($legend);
		var $radRadio =
			$('<label class="hidden">Radio <input type="radio" name="' + idName + '"></label>')
				.appendTo($legend);
		var $radCheckbox =
			$('<label>Checkbox <input type="radio" checked name="' + idName + '"></label>')
				.appendTo($legend);
		var $checkIcons =
			$('<label>Иконки <input type="checkbox" name="with-icons"></label>')
				.appendTo($legend);
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
					addElemInp();
					if (countFields > 9) {
						$btnAddF.remove();
					}
				})
				.appendTo($group);
		if (countGroups < 9) {
			var $btnAddG =
				$('<button class="btn-add-new-g">Добавить новую группу</button>')
					.on('click', function () {
						addSampleGroup('main');
						$btnAddG.remove();
					})
				.appendTo($group);
		}
		function addElemInp() {
			$elemName =
				$('<label><input class="inp-name-elem" type="text" size="50" ' +
					'maxlength="80" placeholder="Название элемента"></label>')
				.appendTo($fieldsContainer);
			$($radRadio).removeClass('hidden');
			$('html, body').animate({ scrollTop: ($elemName).offset().top }, 500);
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
			icon: "ui-icon-circle-plus",
			showLabel: false
		});
		$group.find('[name=selType]').selectmenu();
		$('html, body').animate({ scrollTop: ($group).offset().top }, 800);
		countGroups++;
	}
	addSampleGroup('main');
});

