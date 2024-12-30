import ButtonPrimary from "../ButtonPrimary";
import ButtonInverse from "../ButtonInverse";

type Props = {
    message: string,
    onDialogAnswer: Function;
}

export default function DialogConfirmation({ message, onDialogAnswer }: Props) {

    return (
        // o usuário está clicando fora da caixa ( está "dizendo" que não tem certeza)
        <div className="dsc-dialog-background" onClick={() => onDialogAnswer(false)}>
            {/* stopPropagation não permite que a janela feche ao clicar nela */}
            <div className="dsc-dialog-box" onClick={(event) => event.stopPropagation()}>
                <h2>{message}</h2>
                <div className="dsc-dialog-btn-container" >
                    <div onClick={() => onDialogAnswer(false)}>
                        <ButtonInverse text="Não"/>
                    </div>
                    <div onClick={() => onDialogAnswer(true)}>
                        <ButtonPrimary text="Sim"/>
                    </div>

                </div>

            </div>
        </div>
    );
}