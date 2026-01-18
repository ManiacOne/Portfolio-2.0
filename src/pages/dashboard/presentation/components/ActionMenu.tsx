import Lottie from "lottie-react"
import '../styles/actionMenu.scss'
import { github, linkedin, trimmedGhost } from "../../../../core/constants/assets_images"
import { useActionMenuAnimation } from "../hooks/useActionMenuAnimation"

const ActionMenu = () => {

    const { actionMenuItemsRef, actionMenuRef, setActionMenuItemsRef } = useActionMenuAnimation()

    return (
        <div className='action_menu_container' ref={actionMenuRef}>
            <div className="action_menu_item_left_filler" ref={(el) => setActionMenuItemsRef(el)}></div>
            {
                menuItems.map((item, index) => (
                    <div className="action_menu_item_container" key={index} ref={(el) => setActionMenuItemsRef(el)}>
                        <div className="action_menu_item">
                            <img
                                src={item.icon}
                                className="action_menu_item_img"
                                onClick={item.onClick}
                                key={index}
                                alt={item.icon}
                            />
                        </div>
                    </div>
                ))
            }
            <div className="action_menu_item_right_filler" ref={(el) => setActionMenuItemsRef(el)}></div>
            {/* <div ref={actionMenuRef} className='action_menu_container'>
                <div ref={actionMenuItemsRef} className='action_menu_items'>
                
                    {
                        menuItems.map((item, index) =>
                            item.type === 'lottie' ?
                                <div className="action_menu_item_lottie">
                                    <Lottie
                                        animationData={item.icon}
                                        style={{ height: '36px', width: "36px" }}
                                        onClick={item.onClick}
                                    />
                                </div>
                                :
                                <div className="action_menu_item" key={index}>
                                    <img
                                        src={item.icon}
                                        className="action_menu_item_img"
                                        onClick={item.onClick}
                                        key={index}
                                        alt={item.icon}
                                    />
                                </div>
                        )
                    }
                </div>
            </div> */}
        </div>
    )
}

interface MenuItem {
    icon: any,
    type: 'img' | 'lottie',
    onClick: () => void,
}

const menuItems: MenuItem[] = [
    {
        icon: github,
        type: 'img',
        onClick: () => { }
    },
    {
        icon: linkedin,
        type: 'img',
        onClick: () => { }
    },
    // {
    //     icon: trimmedGhost,
    //     type: 'lottie',
    //     onClick: () => { }
    // },
    {
        icon: linkedin,
        type: 'img',
        onClick: () => { }
    },
    {
        icon: github,
        type: 'img',
        onClick: () => { }
    },

]

export default ActionMenu