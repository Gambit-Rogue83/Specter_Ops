
class Hunter:

    def __init__(self, line_of_sight=False):
        self.movement = 4


class Beast(Hunter):
    """The Beast is a feral animal, that has enhanced senses, to sniff out
    your whereabouts, brutal strength, to inflict greater wounds, and
    his quadrupedal move ensures his swift tracking"""

    def __init__(self):
        super().__init__()
        self.movement = 5

    def enhanced_senses(self):
        pass

    def brutal_strength(self):
        pass


class Prophet(Hunter):
    """The Prophet is a near-deity, that can Mind-read, which increases
     agent wounding chances, Pre-cognition, which is alerted ahead of time
     when an objective is completed, Post-cognition, that relays the agents
     location 2 turns ago"""
    def __init__(self):
        super().__init__()

    def mind_reading(self):
        pass

    def pre_cognition(self):
        pass

    def post_cognition(self):
        pass


class Gun(Hunter):
    """The Gun is a sharpshooter, with abilities like Sharp shooting,
    if he misses the first time, he'll get you again. Quick Draw, allows
    a quick shot, if the agent passes in view. Sniper Shot, which is
    guaranteed, but risky if looking the wrong way"""

    def __init__(self):
        super().__init__()

    def sharp_shooting(self):
        pass

    def quick_draw(self):
        pass

    def sniper_shot(self):
        pass


class Puppet(Hunter):
    """The Puppet can affect the car from a distance. Control
    relay allows him to manipulate the cars' movement. Remote sensor can
     trigger the cars motion detection"""
    def __init__(self):
        super().__init__()

    def control_relay(self):
        pass

    def remote_sensor(self):
        pass


class Car(Hunter):

    def __init__(self):
        super().__init__()
        self.movement = 10

    def motion_detection(self):
        pass
