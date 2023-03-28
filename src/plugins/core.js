/**
 * Descripción: Registro de componentes reutilizables
 *
 * @displayName core.js
 */

import Vue from 'vue';

import NProgress from 'nprogress';
NProgress.configure({ showSpinner: false });

/**
 * Formulario
 */
import BaseForm from '@/components/core/forms/BaseForm.vue';

/**
 * Input
 */
import BaseInput from '@/components/core/forms/BaseInput.vue';

/**
 * Input
 */
import BaseTextArea from '@/components/core/forms/BaseTextArea.vue';

/**
 * AutoComplete
 */
import BaseSelect from '@/components/core/forms/BaseSelect.vue';

/**
 * Input
 */
import BaseSwitch from '@/components/core/forms/BaseSwitch.vue';

/**
 * Modales
 */
import BaseDialog from '@/components/core/alerts/BaseDialog.vue';

/**
 * Loader
 */
import BaseSkeletonLoader from '@/components/core/loaders/BaseSkeletonLoader.vue';

/**
 * Loader
 */
import BaseProgressLinear from '@/components/core/steppers/BaseProgressLinear.vue';

/**
 * Alternative Dialog
 */
import BaseBottomSheet from '@/components/core/alerts/BaseBottomSheet.vue';

/**
 * Alternative Dialog Actions
 */
import BaseActionBottomSheet from '@/components/core/alerts/BaseActionBottomSheet.vue';

/**
 * Alternative Dialog
 */
import BaseDialogNextGen from '@/components/core/alerts/BaseDialogNextGen.vue';

/**
 * Alternative Dialog Actions
 */
import BaseActionDialogNextGen from '@/components/core/alerts/BaseActionDialogNextGen.vue';

/**
 * Alternative Dialog
 */
import BasePopUp from '@/components/core/alerts/BasePopUp.vue';

/**
 * Alternative Dialog Actions
 */
import BaseActionPopUp from '@/components/core/alerts/BaseActionPopUp.vue';

/**
 * Alternative Dialog Actions
 */
import BaseNavigationDrawer from '@/components/core/alerts/BaseNavigationDrawer.vue';

/**
 * Alternative Dialog Actions
 */
import BaseRadioGroup from '@/components/core/forms/BaseRadioGroup.vue';

import shareIt from 'vue-share-it';

Vue.use(shareIt);

/**
 * Registro de Componente
 */
Vue.component(BaseForm.name, BaseForm);

/**
 * Registro de Componente
 */
Vue.component(BaseInput.name, BaseInput);

/**
 * Registro de Componente
 */
Vue.component(BaseTextArea.name, BaseTextArea);

/**
 * Registro de Componente
 */
Vue.component(BaseSelect.name, BaseSelect);

/**
 * Registro de Componente
 */
Vue.component(BaseSwitch.name, BaseSwitch);

/**
 * Registro de Componente
 */
Vue.component(BaseDialog.name, BaseDialog);

/**
 * Registro de Componente
 */
Vue.component(BaseSkeletonLoader.name, BaseSkeletonLoader);

/**
 * Registro de Componente
 */
Vue.component(BaseProgressLinear.name, BaseProgressLinear);

/**
 * Registro de Componente
 */
Vue.component(BaseBottomSheet.name, BaseBottomSheet);

/**
 * Registro de Componente
 */
Vue.component(BaseActionBottomSheet.name, BaseActionBottomSheet);

/**
 * Registro de Componente
 */
Vue.component(BaseDialogNextGen.name, BaseDialogNextGen);

/**
 * Registro de Componente
 */
Vue.component(BaseActionDialogNextGen.name, BaseActionDialogNextGen);

/**
 * Registro de Componente
 */
Vue.component(BasePopUp.name, BasePopUp);

/**
 * Registro de Componente
 */
Vue.component(BaseActionPopUp.name, BaseActionPopUp);

/**
 * Registro de Componente
 */
Vue.component(BaseNavigationDrawer.name, BaseNavigationDrawer);

/**
 * Registro de Componente
 */
Vue.component(BaseRadioGroup.name, BaseRadioGroup);
