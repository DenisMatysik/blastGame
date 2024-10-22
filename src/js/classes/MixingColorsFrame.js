import { ButtonMixing } from "./ButtonMixing";

export class MixingColorsFrame {
    scene;
    config;
    mixingColorsCount;
    textValue;

    constructor(scene, config, mixingColorsCount) {
        this.scene = scene;
        this.config = config;
        this.mixingColorsCount = mixingColorsCount;

        this._createElements(config, mixingColorsCount);
    }

    /**
     * Метод создает элементы поля "MixingColorsFrame"
     * @private
     * @param {{string}} config - конфиг с параметрами
     **/
    _createElements(config, mixingColorsCount) {
		this.scene.make.text(config.text);
		this.textValue = this.scene.make.text({
            ...config.textValue,
            text: mixingColorsCount
        });
        this.buttonMixing = new ButtonMixing(this.scene, config.btn);
        this.scene.make.text(config.description);
    }

    /**
     * Метод который обновляет значение оставшихся перемешиваний
     * @public
     **/
	updateMixingColorsText(value) {
		this.textValue.setText(value);
	}

    /**
     * Метод сбросит все значения поля
     * @public
     **/
    resetFrameParams(value) {
        this.mixingColorsCount = value;
        this.updateMixingColorsText(this.mixingColorsCount);
        this.buttonMixing.activeDisableBtn(true);
    }
}