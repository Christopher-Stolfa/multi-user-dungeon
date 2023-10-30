package main

type Spell struct {
	Index         string         `json:"index"`
	Name          string         `json:"name"`
	Desc          []string       `json:"desc"`
	HigherLevel   []string       `json:"higher_level"`
	Range         string         `json:"range"`
	Components    []string       `json:"components"`
	Material      string         `json:"material"`
	Ritual        bool           `json:"ritual"`
	Duration      string         `json:"duration"`
	Concentration bool           `json:"concentration"`
	CastingTime   string         `json:"casting_time"`
	Level         int            `json:"level"`
	AttackType    string         `json:"attack_type"`
	Damage        DamageInfo     `json:"damage"`
	School        SchoolInfo     `json:"school"`
	Classes       []ClassInfo    `json:"classes"`
	Subclasses    []SubclassInfo `json:"subclasses"`
	URL           string         `json:"url"`
}

type DamageInfo struct {
	DamageType         DamageType        `json:"damage_type"`
	DamageAtSlotLevels map[string]string `json:"damage_at_slot_level"`
}

type DamageType struct {
	Index string `json:"index"`
	Name  string `json:"name"`
	URL   string `json:"url"`
}

type SchoolInfo struct {
	Index string `json:"index"`
	Name  string `json:"name"`
	URL   string `json:"url"`
}

type ClassInfo struct {
	Index string `json:"index"`
	Name  string `json:"name"`
	URL   string `json:"url"`
}

type SubclassInfo struct {
	Index string `json:"index"`
	Name  string `json:"name"`
	URL   string `json:"url"`
}
